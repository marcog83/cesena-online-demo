let Connection = require("../dati-jobs/db/db-connection").Connection;
let Tables = require("../dati-jobs/db/tables");
let rules = require("../dati-jobs/fb/find-categories");
let R = require("ramda");
let ObjectId = require('mongodb').ObjectId;
var KEY = "AIzaSyA2awqLXHWlJuyI5mLY2du4NcuA7OYgpus";
let urlRegex = require("url-regex");
let hoursHelper = require("./opening_hours-helper");
let textFormatter = require("./text-formatter");
var normalizeUrl = require('normalize-url');
function eliminaEccezioni(id) {
    var noop = _=>R.identity;
    var eccezioni = {
        benessere: noop
        , viaggiare: noop
        , food: noop
        , locali: function (place) {
            return R.find((cate)=> {
                return !cate.name.match(/Public|Gastropub|Publisher/gmi)
            }, place.category_list)
        }
        , tech: noop
        , music: noop
        , health: noop
        , architecture: noop
        , arts: noop
        , "movie-theater": noop
        , sports: noop
    };
    var fn=eccezioni[id]||noop;
    return R.filter(fn)
}

function getOtherPhotos(detail) {
    return (R.view(R.lensPath(["photos"]), detail) || []).map(googleImage=> {
        var image_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${googleImage.width}&maxheight=${googleImage.height}&photoreference=${googleImage.photo_reference}&key=${KEY}`.trim();
        return {
            image: image_url
            , description: ""
            , rating: null
            , comments: null
        }
    })
}

function mapDetailPlace({my_place, google, facebook}) {
    var googleImage = (R.view(R.lensPath(["photos"]), google) || [])[0];
    var otherPhotos = getOtherPhotos(google);
    if (googleImage) {
        var image_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${googleImage.width}&maxheight=${googleImage.height}&photoreference=${googleImage.photo_reference}&key=${KEY}`.trim()
    }
    return {
        address: R.view(R.lensPath(["formatted_address"]), google) || R.view(R.lensPath(["location", "street"]), facebook),
        name: R.view(R.lensPath(["name"]), google) || R.view(R.lensPath(["name"]), facebook),
        openingHours: R.view(R.lensPath(["opening_hours", "weekday_text"]), google) || hoursHelper.fbHours(R.view(R.lensPath(["hours"]), facebook)) ,
        rating: R.view(R.lensPath(["rating"]), google),
        telephone: R.view(R.lensPath(["international_phone_number"]), google),
        image: R.view(R.lensPath(["cover", "source"]), facebook) || image_url || "/static/img/placeholder-cover.jpg",
        place_id: R.view(R.lensPath(["place_id"]), google),
        geo: my_place.location,
        id: my_place._id,
        id_facebook: my_place.id_facebook,
        id_google: my_place.id_google,
        id_opendata: my_place.id_opendata,
        description: formatDescription(facebook.description || ""),
        bio: facebook.bio,
        category_list: facebook.category_list,
        mission: facebook.mission,
        general_info: facebook.general_info,
        website: R.view(R.lensPath(["website"]), google) || R.view(R.lensPath(["website"]), facebook) || (facebook && `https://www.facebook.com/${facebook.id}`),
        mapUrl: R.view(R.lensPath(["url"]), google),
        email: R.view(R.lensPath(["emails"]), facebook),
        url: `/places/detail/${my_place._id}`,
        facebook_page: facebook && `https://www.facebook.com/${facebook.id}`
        ,otherPhotos
    }
}
exports.findByChannel = function (id, options = {limit: 12}) {
    var connection = new Connection();
    var REG_EXP = {
        benessere: rules.BENESSERE
        , viaggiare: rules.BUSISNESS
        , busisness: rules.BUSISNESS
        , food: rules.FOOD
        , locali: rules.LOCALI
        , tech: rules.TECH
        , music: rules.MUSICA
        , health: rules.SALUTE
        , architecture: rules.ARCHITETTURA
        , arts: rules.ARTS
        , "movie-theater": rules.TEATRI_CINEMA
        , sports: rules.SPORTS

    };
    return connection.connect()

        .then(db=> {
            var fb_places = db.collection(Tables.FACEBOOK_PLACES);
            var my_places = db.collection(Tables.MY_PLACES);
            var google_places = db.collection(Tables.GOOGLE_PLACES);
            var _regexp=REG_EXP[id]||new RegExp(id,"gi");
            return Promise.all([
                my_places.find().toArray()
                , fb_places.find({category_list: {$elemMatch: {name: _regexp}}}, {
                    _id: 0,

                    events: 0,
                    photos: 0,
                    posts: 0
                }).limit(options.limit).toArray().then(eliminaEccezioni(id))
                , google_places.find({}, {
                    _id: 0,

                    address_components: 0,
                    adr_address: 0,
                    geometry: 0
                    , reference: 0
                    , reviews: 0
                }).toArray()
            ])
        })
        .then(R.tap(_=>connection.db.close()))
        .then(([my_places,fb_places,google_places])=> {
            return fb_places.map(fb_place=> {
                var my_place = R.find(place=>place.id_facebook == fb_place.id, my_places);
                if (my_place) {
                    var google_place = R.find(g_place=>g_place.place_id == my_place.id_google, google_places);

                }
                return {
                    my_place: my_place || {},
                    facebook: fb_place || {},
                    google: google_place || {}
                }
            })

        })
        .then(places=> {
            return places.map(mapDetailPlace)
        })
};


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
            return mapEvent(new Date(event.start_time), new Date(event.end_time))(event);
        })
        , R.filter(filterDate)
    );
    return ([my_places,my_events])=> {
        var newEvents = reducer(my_events);
        newEvents = newEvents.map(event=> {
            var place_id = event.place.id || event.place;
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
        //.then(connection.collection.bind(connection, Tables.MY_EVENTS))
        .then(db=> {
            var myPlaces = db.collection(Tables.MY_PLACES);
            var myEvents = db.collection(Tables.MY_EVENTS);

            return Promise.all([
                myPlaces.find().toArray()
                , myEvents.find().toArray()
            ])
        })
        .then(getEvents({start_time, end_time, limit}))
        .then(R.tap(_=>connection.db.close()));
};
exports.eventiByPlace = ({start_time, end_time, limit,id_place})=> {
    var connection = new Connection();

    return connection.connect()
        //.then(connection.collection.bind(connection, Tables.MY_EVENTS))
        .then(db=> {
            var myPlaces = db.collection(Tables.MY_PLACES);
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


function getMyPlaceDetails(connection){
   return function(my_place){
       var fb_places = connection.db.collection(Tables.FACEBOOK_PLACES);
       var google_places = connection.db.collection(Tables.GOOGLE_PLACES);
       var promises = [];
       if (my_place.id_facebook) {
           promises.push(fb_places.findOne({id: my_place.id_facebook}))
       }
       if (my_place.id_google) {
           promises.push(google_places.findOne({place_id: my_place.id_google}))
       }
       if (!promises.length) {
           promises = [Promise.resolve([{}, {}])]
       }
       return Promise.all(promises).then(([fb_place,google_place])=> {
           return {
               my_place: my_place,
               facebook: fb_place || {},
               google: google_place || {}
           }
       }).catch(R.tap(_=>connection.db.close()))
   }
}

exports.findById = id=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.MY_PLACES))
        .then(coll=> {
            return coll.findOne({_id: ObjectId(id)});
        })

        .then(getMyPlaceDetails(connection))
        .then(R.tap(_=>connection.db.close()))
        .then(mapDetailPlace)
        .catch(R.tap(_=>connection.db.close()))

};
exports.findMyPlaceByFacebookId = id_facebook=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.MY_PLACES))
        .then(coll=> {
            return coll.findOne({id_facebook});
        })

        .then(getMyPlaceDetails(connection))
        .then(R.tap(_=>connection.db.close()))
        .then(mapDetailPlace)
        .catch(R.tap(_=>connection.db.close()))

};


function mapInstagramPhoto(photo) {

    return {
        image: photo.thumbnail_src
        , description: textFormatter(photo.caption ||"")
        , rating: R.view(R.lensPath(["likes", "count"]), photo)
        , comments: R.view(R.lensPath(["comments", "count"]), photo)
    }
}
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
                latitude: my_place.location.lat
                , longitude: my_place.location.lng
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

exports.photosById = id=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.MY_PLACES))
        .then(coll=> {
            return coll.findOne({_id: ObjectId(id)});
        })
        .then(my_place=> {
            if (!my_place.id_facebook)return {};
            var coll = connection.db.collection(Tables.INSTAGRAM_PHOTOS);
            return coll.findOne({id_facebook: my_place.id_facebook})
                .then(instagram=>instagram.instagram_photos);
        })
        .then(R.map(mapInstagramPhoto))

        .then(R.tap(_=>
                connection.db.close()
        ))

        .catch(R.tap(_=>connection.db.close()))
};
exports.photosHighlight = ({limit=3})=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.INSTAGRAM_PHOTOS))
        .then(coll=> {
            return coll.find({'instagram_photos.0': {$exists: true}}, {limit}).toArray()
                .then(R.flatten)
                .then(R.map(instagram=>instagram.instagram_photos.slice(0, 1)))
                .then(R.flatten)

        })
        .then(R.map(mapInstagramPhoto))
        .then(R.tap(_=>connection.db.close()))
        .catch(R.tap(_=>connection.db.close()))
};

exports.findEventById = id=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.MY_EVENTS))
        .then(coll=> coll.findOne({_id: ObjectId(id)}))
        .then(event=> {
            var myPlaceColl = connection.db.collection(Tables.MY_PLACES);
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