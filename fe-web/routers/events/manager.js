let Connection = require("../../../dati-jobs/db/db-connection").Connection;
let Tables = require("../../../dati-jobs/db/tables");
let SeoUrl = require("../../plugins/seo/seo-url");

let R = require("ramda");
let ObjectId = require('mongodb').ObjectId;

let urlRegex = require("url-regex");

var normalizeUrl = require('normalize-url');


var getEvents = function () {
    return ([my_places,my_events])=> {
        var findEvents = R.map(event=> {
                var place_id = event.place.id;
                var owner_id = event.owner.id;

                var place = R.find(place=>place.id_facebook.includes(place_id), my_places) || {};
                var owner = R.find(place=>place.id_facebook.includes(owner_id), my_places) || {};
                if (!place._id && owner._id) {
                    place = owner;
                } else if (!owner._id && place._id) {
                    owner = place;
                }
                place.seo_url = `/${SeoUrl.createURL(place.name)}`;
                owner.seo_url = `/${SeoUrl.createURL(owner.name)}`;
                var seo_url = `/${SeoUrl.createURL(event.name)}`;

                return Object.assign(event, {
                    image: R.view(R.lensPath(['cover', 'source']), event)
                    , seo_url
                    , owner
                    , place
                })

            }
        );
        return findEvents(my_events);
    }
};

exports.eventi = ({start_time, end_time, limit})=> {
    var connection = new Connection();

    return connection.connect()

        .then(db=> {
            var myPlaces = db.collection(Tables.MY_PLACES_2);
            var myEvents = db.collection(Tables.MY_EVENTS);
            var query = {start_time: {$gte: start_time.getTime()}};
            if (end_time) {
                query.end_time = {$lte: end_time.getTime()};
            }
            return Promise.all([
                myPlaces.find().toArray()
                , myEvents.find(query).limit(limit).sort({start_time:1}).toArray()
            ])
        })
        .then(getEvents())
        .then(R.tap(_=>connection.db.close()))
        .catch(R.tap(_=>connection.db.close()));
};
exports.eventiByPlace = ({start_time, end_time, limit, id_place})=> {
    var connection = new Connection();

    return connection.connect()
    //.then(connection.collection.bind(connection, Tables.MY_EVENTS))
        .then(db=> {
            var myPlaces = db.collection(Tables.MY_PLACES_2);
            var myEvents = db.collection(Tables.MY_EVENTS);
            return myPlaces.findOne({_id: ObjectId(id_place)}).then(my_place=> {
                var time_query = {start_time: {$gte: start_time.getTime()}};
                if (time_query) {
                    time_query.end_time = {$lte: end_time.getTime()};
                }

                return myEvents.find(
                    {
                        $and: [
                            time_query,
                            {
                                $or: [
                                    {"owner.id": {$in: my_place.id_facebook}}
                                    , {"place.id": {$in: my_place.id_facebook}}
                                ]
                            }
                        ]
                    }
                ).limit(limit).sort({start_time:1}).toArray()
                    .then(my_events=> {
                        return [[my_place], my_events]
                    })
            })

        })
        .then(getEvents())
        .then(R.tap(_=>connection.db.close()))
        .catch(R.tap(_=>connection.db.close()));
};


function formatDescription(description = "") {
    return (description.match(urlRegex()) || []).reduce((prev, curr)=> {
        var link = normalizeUrl(curr);
        return prev.replace(curr, `<a href='${link}'>${curr}</a>`)
    }, description.replace(/\n/gi, "<br>"));
}


exports.findEventById = id=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.MY_EVENTS))
        .then(coll=> coll.findOne({_id: ObjectId(id)}))
        .then(event=> {
            var myPlaceColl = connection.db.collection(Tables.MY_PLACES_2);
            var id_owner = event.owner && event.owner.id;
            var id_place = event.place && event.place.id;
            return Promise.all([
                id_owner ? myPlaceColl.findOne({id_facebook: id_owner}) : Promise.resolve(null),
                id_place ? myPlaceColl.findOne({id_facebook: id_place}) : Promise.resolve(null)
            ]).then(([owner,place])=> {
                var description = formatDescription(event.description);
                if (!place && owner) {
                    place = owner;
                } else if (!owner && place) {
                    owner = place;
                } else if (!place && !owner) {
                    place = owner = {};
                }
                place.seo_url = `/${SeoUrl.createURL(place.name)}`;
                owner.seo_url = `/${SeoUrl.createURL(owner.name)}`;

                return Object.assign({
                    image: R.view(R.lensPath(['cover', 'source']), event)
                }, event, {
                    description
                    , raw_description: event.description
                    , owner
                    , place
                })
            });


        })
        .then(R.tap(_=>connection.db.close()))
        .catch(R.tap(_=>connection.db.close()))
};