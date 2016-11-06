var Connection = require("./db/db-connection").Connection;
var Tables = require("./db/tables");
var R = require("ramda");
var ObjectId = require('mongodb').ObjectID;
var Scores = {

    "address": R.always(1),
    "name": R.always(1),
    "openingHours": R.always(2),
    "rating": R.always(2),
    "telephone": R.always(1),
    "image": R.always(2),
    "place_id": R.always(2),
    "geo": R.always(2),
    "id_facebook": R.always(2),
    "id_google": R.always(2),
    "id_opendata": R.always(1),
    "id_impresa": R.always(1),
    "description": R.always(2),
    "bio": R.always(2),
    "category_list": R.always(1),
    "mission": R.always(2),
    "general_info": R.always(2),
    "website": R.always(1),
    "mapUrl": R.always(2),
    "email": R.always(1),
    "score": R.always(0),
    "facebook_page": R.always(2),
    "otherPhotos": photos=>2 + 0. * photos.length,
    "photos": photos=>3 + 0.4 * photos.length

};

function getScore(place) {
    return Object.keys(place)
        .filter(key=>place[key])
        .reduce((prev, curr)=> {
            var fn = Scores[curr] || R.always(0);
            return prev + fn(place[curr]);

        }, 0);
}

function scorePlaces() {
    var connection = new Connection();
   return  connection.connect()
        .then(db=> {
            var coll = db.collection(Tables.MY_PLACES_2);
            return coll.find().toArray();
        })
        .then(my_places=> {
            return my_places.map(place=> {
                return Object.assign(place, {score: getScore(place)});
            })
        })
        .then(places=> {
            var coll = connection.db.collection(Tables.MY_PLACES_2);
            var promises = places.map(place=> {
                return coll.findOneAndUpdate({_id: ObjectId(place._id)}, {$set: {score: place.score}});
            });
            return Promise.all(promises)
        })
        .then(_=> {
            connection.db.close();
           // process.exit(0)
        })
        .catch(_=> {
            console.log(_);
            connection.db.close();
           // process.exit(1);
        })
}
exports.scorePlaces=scorePlaces;