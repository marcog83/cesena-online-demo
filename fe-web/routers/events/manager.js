let Connection = require("../../../dati-jobs/db/db-connection").Connection;
let Tables = require("../../../dati-jobs/db/tables");

let R = require("ramda");
let ObjectId = require('mongodb').ObjectId;

let urlRegex = require("url-regex");

var normalizeUrl = require('normalize-url');





var getEvents = function ({start_time, end_time, limit}) {
    var start_timestamp = start_time.getTime();
    var mapEvent = function (start_time, end_time) {
        return R.compose(
                _event=> {

                return Object.assign({image: R.view(R.lensPath(['cover', 'source']), _event)}, _event)
            }
            , R.set(R.lensProp('start_time'), start_time)
            , R.set(R.lensProp('end_time'), end_time)
        );
    };
    var filterDate = R.compose(
        (eventTimestamp)=>eventTimestamp >= start_timestamp
        , (event)=>new Date(event.start_time).getTime()
    );
    var reducer = R.compose(
        R.takeLast(limit)
        , R.sortBy(event=> {
            return event.start_time.getTime()
        })
        , R.map(event=> {
            return mapEvent(new Date(event.start_time), event.end_time?new Date(event.end_time):new Date(event.start_time))(event);
        })
        , R.filter(filterDate)
    );
    return ([my_places,my_events])=> {
        var newEvents = reducer(my_events);
        newEvents = newEvents.map(event=> {
            var place_id = (event.owner && event.owner.id) || event.place && event.place.id || event.place;
           // var place_id = event.place.id || event.place;
            var my_place = R.find(place=>place.id_facebook == place_id, my_places);

            var place = formatEventPlace(my_place, event);
            return Object.assign(event, {place});

        });
        return newEvents;
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
exports.eventiByPlace = ({start_time, end_time, limit,id_place})=> {
    var connection = new Connection();

    return connection.connect()
        //.then(connection.collection.bind(connection, Tables.MY_EVENTS))
        .then(db=> {
            var myPlaces = db.collection(Tables.MY_PLACES_2);
            var myEvents = db.collection(Tables.MY_EVENTS);
            return myPlaces.findOne({_id: ObjectId(id_place)}).then(my_place=> {
                return myEvents.find({
                    $or: [
                        {
                            $and: [
                                {"place.id": {$exists: true}}
                                , {"place.id": my_place.id_facebook}
                            ]
                        }
                        , {
                            $and: [
                                {"place.id": {$exists: false}}
                                , {place: my_place.id_facebook}
                            ]
                        }
                    ]
                }).toArray()
                    .then(my_events=> {
                        return [[my_place], my_events]
                    })
            })

        })
        .then(getEvents({start_time, end_time, limit}))
        .then(R.tap(_=>connection.db.close()));
};






function formatDescription(description = "") {
    return (description.match(urlRegex()) || []).reduce((prev, curr)=> {
        var link = normalizeUrl(curr);
        return prev.replace(curr, `<a href='${link}'>${curr}</a>`)
    }, description.replace(/\n/gi, "<br>"));
}
var formatEventPlace = R.curryN(2, function (my_place, event) {
    var place = event.place;
    if (R.is(String, event.place)&&my_place) {
        place = {
            name: my_place.name,
            location: {
                latitude: my_place.geo.lat
                , longitude: my_place.geo.lng
            },
            id: my_place.id_facebook

        }
    }
    if(my_place){
        place.name = my_place.name;
        place._id = my_place._id;
    }

    return place;
});



exports.findEventById = id=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.MY_EVENTS))
        .then(coll=> coll.findOne({_id: ObjectId(id)}))
        .then(event=> {
            var myPlaceColl = connection.db.collection(Tables.MY_PLACES_2);
            var id = event.place.id || event.place;
            return myPlaceColl.findOne({id_facebook: id}).then(my_place=> {
                var description = formatDescription(event.description);
                var place = formatEventPlace(my_place, event)

                return Object.assign({image: R.view(R.lensPath(['cover', 'source']), event)}, event, {
                    description
                    , place
                })
            });

        })
        .then(R.tap(_=>connection.db.close()))
        .catch(R.tap(_=>connection.db.close()))
};