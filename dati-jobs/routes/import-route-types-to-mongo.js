/**
 * Created by mgobbi on 04/04/2016.
 */
// Using require() in ES2015
// Using require() in ES5


 var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;

var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/cesena-sociale';

function getPlaces() {
    return new Promise(function (resolve, reject) {
        var routes = JSON.parse(fs.readFileSync("routes/runstatic-route-types.json"));

        resolve(routes)
    })
}


function getPlace(place, i) {
    return {
        place_id: place.id,
        about: place.about,
        name: place.name,
        location: place.location
        , cover: (place.cover && place.cover.cover_id || null)
        , posts: (place.posts && place.posts.data || []).map(_post=> {
            return _post.id
        })
        , photos: (place.photos && place.photos.data || []).map(_post=> {
            return _post.id
        })
    }

}


// FACEBOOK

getPlaces().then(function (routes) {

    return new Promise(function (resolve, reject) {

        MongoClient.connect(url, function (err, db) {
            // Get the collection
            var col = db.collection('runtastic-route-types');
            col.insertMany(routes).then(function (r) {
                if (routes.length == r.insertedCount) {
                    resolve(true)
                } else {
                    reject("non tutti insert")
                }
                // Finish up test
                db.close();
            });
        });
    })

}).then(function (e) {
    console.log("OK");
    process.exit(0);
}, function (e) {
    console.log("KO", e);
    process.exit(1);
})

