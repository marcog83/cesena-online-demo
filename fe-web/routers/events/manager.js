let Connection = require("../../../dati-jobs/db/db-connection").Connection;
let Tables = require("../../../dati-jobs/db/tables");
let SeoUrl = require("../../plugins/seo/seo-url");

let R = require("ramda");
let ObjectId = require('mongodb').ObjectId;

let urlRegex = require("url-regex");

var normalizeUrl = require('normalize-url');


var getEvents = function ({start_time, end_time, limit}) {
    var start_timestamp = start_time.getTime();
    if (end_time) {
        var end_timestamp = end_time.getTime();
    }

    var mapEvent = function (start_time, end_time) {
        return R.compose(
            R.set(R.lensProp('start_time'), start_time)
            , R.set(R.lensProp('end_time'), end_time)
        );
    };
    var filterDate = R.compose(
        (eventTimestamp)=> {
            var bigger_than = eventTimestamp >= start_timestamp;
            var lesser_than = true;
            if (end_timestamp) {
                lesser_than = eventTimestamp <= end_timestamp;
            }

            return bigger_than && lesser_than;
        }
        , (event)=>new Date(event.start_time).getTime()
    );
    var reducer = R.compose(
        R.takeLast(limit)
        , R.sortBy(event=> {
            return event.start_time.getTime()
        })
        , R.map(event=> {
            return mapEvent(new Date(event.start_time), event.end_time ? new Date(event.end_time) : new Date(event.start_time))(event);
        })
        , R.filter(filterDate)
    );


    return ([my_places,my_events])=> {
        var findEvents = R.compose(
            R.filter(event=> {
                return (event.owner._id && event.place._id);
            })
            , R.map(event=> {
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
            ));
        return findEvents(reducer(my_events));
    }
};

exports.eventi = ({start_time, end_time, limit})=> {
    var connection = new Connection();

    return connection.connect()

        .then(db=> {
            var myPlaces = db.collection(Tables.MY_PLACES_2);
            var myEvents = db.collection(Tables.MY_EVENTS);

            return Promise.all([
                myPlaces.find().toArray()
                , myEvents.find().toArray()
            ])
        })
        .then(getEvents({start_time, end_time, limit}))
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
                return myEvents.find(
                    {
                        $or: [
                            {"owner.id": {$in: my_place.id_facebook}}
                            , {"place.id": {$in: my_place.id_facebook}}
                        ]
                    }
                ).toArray()
                    .then(my_events=> {
                        return [[my_place], my_events]
                    })
            })

        })
        .then(getEvents({start_time, end_time, limit}))
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
            var id_owner = event.owner.id;
            var id_place = event.place.id;
            return Promise.all([
                myPlaceColl.findOne({id_facebook: id_owner}),
                myPlaceColl.findOne({id_facebook: id_place})
            ]).then(([owner,place])=> {
                var description = formatDescription(event.description);
                if (!place && owner) {
                    place = owner;
                } else if (!owner && place) {
                    owner = place;
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