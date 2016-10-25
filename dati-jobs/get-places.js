var fs = require("fs-promise");
var {getOpenData}=require("./opendata/get-opendata");
//var {getPlaces, getPlacesDetails, getInstagram, getAccessToken}=require("./fb/fb-place");
var FB = require("./fb/fb-place");
var FBHelpers = require("./fb/get-events");
var google = require("./google-places/google-place");
var {findSimilarityGoogleFB} = require("./filtra-fb-google");
var Connection = require("./db/db-connection").Connection;
var Tables = require("./db/tables");
var _ = require('lodash');
var R = require('ramda');


function addGoogleToPlaces(places) {
    return Promise.all(places.map(function (place, i) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                google.getPlace(place).then(results=>({
                    fb: place
                    , google: results
                })).then(function (response) {
                    resolve(response);
                })
            }, i * 2000);
        })
        // .then(R.tap(response=>console.log(i,": length:",response.google.length)))
    }))
}
function writeJSONFile(filename) {
    return function (fb_places) {
        return fs.writeFile(filename, JSON.stringify(fb_places)).then(_=>filename);
    }
}
function readJSONFile(filename) {
    return Promise.resolve(JSON.parse(fs.readFileSync(filename)));
}

const FB_PLACES_JSON = "fb_places.json";
const FACEBOOK_DETAILS_JSON = "fb_details_places.json";
const FB_AND_GOOGLE_PLACES_FILTERED_JSON = "fb-and-google-places-filtered.json";
const FB_AND_GOOGLE_PLACES_JSON = "fb-and-google-places.json";
const MY_PLACES_JSON = "my-places.json";
const NEW_PLACES_ADDED_JSON = "new-my-places.json";
const OPEN_DATA_JSON = "opendata-places.json";
const GOOGLE_DETAILS_JSON = "google-details-places.json";
const INSTAGRAM_PHOTOS_JSON = "instagram-photos-slow.json";
function getMyPlaces() {
    return Promise.all([
        readJSONFile(FB_PLACES_JSON)
        , readJSONFile(FB_AND_GOOGLE_PLACES_FILTERED_JSON)
    ]).then(([fb_places,fb_google_filtered])=> {
        return fb_places.map(p=> {
            var _f = _.find(fb_google_filtered, i=>i.fb.id == p.id);
            var id_google = _f ? _f.google.place_id : null;
            return {
                name: p.name
                , location: {
                    lat: p.location.latitude
                    , lng: p.location.longitude
                }
                , id_facebook: p.id
                , id_google: id_google
                , id_opendata: null
            }
        })
    })
}


function updatePlaces({from_file}) {
    var promise;
    if (from_file) {
        promise = Promise.resolve(MY_PLACES_JSON);
    } else {
        //da fb aggiungere google
        promise = FB.getPlaces()
            .then(writeJSONFile(FB_PLACES_JSON))
            .then(readJSONFile)
            .then(addGoogleToPlaces)
            .then(writeJSONFile(FB_AND_GOOGLE_PLACES_JSON))
            .then(readJSONFile)
            .then(findSimilarityGoogleFB)
            .then(writeJSONFile(FB_AND_GOOGLE_PLACES_FILTERED_JSON))
            .then(getMyPlaces)
            .then(writeJSONFile(MY_PLACES_JSON))
    }

    return promise.then(updateMyPlaces)
    // .then(places=> {
    //     var connection = new Connection();
    //     connection.connect()
    //         .then(_=>Tables.MY_PLACES)
    //         .then(connection.collection.bind(connection))
    //         .then(col=> {
    //             var fromFB_GOOGLE = Promise.all(places.map(place=> {
    //
    //                 return col.findOneAndUpdate({
    //                     $or: [
    //                         {
    //                             $and: [
    //                                 {id_facebook: {$ne: null}},
    //                                 {id_facebook: place.id_facebook}
    //                             ]
    //                         }
    //                         , {
    //                             $and: [
    //                                 {id_google: {$ne: null}},
    //                                 {id_google: place.id_google}
    //                             ]
    //                         }
    //                     ]
    //                 }, place, {upsert: true}).then(function (r) {
    //
    //                     if (!r.lastErrorObject.updatedExisting) {
    //                         return place;
    //                     } else {
    //                         return null;
    //                     }
    //
    //
    //                 }).catch(R.tap(e=> console.log("update failed:", e)))
    //             }));
    //
    //             return fromFB_GOOGLE
    //
    //         })
    //         .then(R.tap(_=> connection.db.close()))
    //         .then(R.filter(R.identity))
    //         .then(writeJSONFile(NEW_PLACES_ADDED_JSON))
    //         .catch(R.tap(e=> console.log("update failed:", e)))
    // });
}
function updateMyPlaces() {
    return readJSONFile(MY_PLACES_JSON).then(places=> {
        var connection = new Connection();
        return connection.connect()
            .then(_=>Tables.MY_PLACES)
            .then(connection.collection.bind(connection))
            .then(col=> {
                var fromFB_GOOGLE = Promise.all(places.map(place=> {

                    return col.findOneAndUpdate({
                        $or: [
                            {
                                $and: [
                                    {id_facebook: {$ne: null}},
                                    {id_facebook: place.id_facebook}
                                ]
                            }
                            , {
                                $and: [
                                    {id_google: {$ne: null}},
                                    {id_google: place.id_google}
                                ]
                            }
                        ]
                    }, {$set: place}, {upsert: true, returnNewDocument: true}).then(function (r) {

                        if (!r.lastErrorObject.updatedExisting) {
                            return place;
                        } else {
                            return null;
                        }


                    }).catch(R.tap(e=> console.log("update failed:", e)))
                }));

                return fromFB_GOOGLE

            })
            .then(R.tap(_=> connection.db.close()))
            .then(R.filter(R.identity))
            .then(writeJSONFile(NEW_PLACES_ADDED_JSON))
            .catch(R.tap(e=> console.log("update failed:", e)))
    });
}


function updateFromOpendata({from_file}) {
    //$or: [ { quantity: { $lt: 20 } }, { price: 10 } ]

    var promise;
    if (from_file) {
        promise = Promise.resolve(OPEN_DATA_JSON);
    } else {

        promise = getOpenData().then(writeJSONFile(OPEN_DATA_JSON))
    }
    return promise.then(readJSONFile)
        .then(response=> {
            return response.map(place=> {
                var name = place.facebook.name || place.google.name || place.opendata.nome || place.opendata.titolare
                var location = {
                    latitude: (place.google.geometry && place.google.geometry.location.lat)
                    || (place.facebook.location && place.facebook.location.latitude)
                    || place.opendata.latitudine
                    , longitude: (place.google.geometry && place.google.geometry.location.lng)
                    || (place.facebook.location && place.facebook.location.longitude)
                    || place.opendata.longitudine
                };
                return {
                    name
                    , location
                    , id_facebook: place.facebook.id || null
                    , id_google: place.google.place_id || null
                    , id_opendata: place.opendata.id || null
                }
            })
        })
        .then(places=> {
            var connection = new Connection();
            connection.connect()
                .then(_=>Tables.MY_PLACES)
                .then(connection.collection.bind(connection))
                .then(col=> {
                    return Promise.all(places.map(place=> {
                        return col.findOneAndUpdate({
                            $or: [
                                {
                                    $and: [
                                        {id_facebook: place.id_facebook},
                                        {id_facebook: {$ne: null}}]
                                },
                                {
                                    $and: [
                                        {id_google: place.id_google},
                                        {id_google: {$ne: null}}]
                                },
                                {
                                    $and: [
                                        {id_opendata: place.id_opendata},
                                        {id_opendata: {$ne: null}}]
                                }
                            ]
                        }, place, {upsert: true})
                            .then(R.tap(e=> console.log("update failed:", e)))
                            .catch(R.tap(e=> console.log("update failed:", e)))
                    }));
                })
                .then(function (response) {
                    connection.db.close();
                    //process.exit(0);
                }).catch(e=> {
                    console.log("from_OPENDATA_FB_GOOGLE update failed:", e);
                    connection.db.close();
                    //process.exit(1);
                    return e;
                })
        });

}

function getFacebookDetails({from_file=true}) {
    var promise;
    if (!from_file) {
        promise = readJSONFile(MY_PLACES_JSON)
            .then(R.filter(place=>place.id_facebook))
            .then(places=> {
                return Promise.all(places
                    .map((place, i)=> {
                        return new Promise((resolve, reject)=> {
                            setTimeout(_=> {
                                FB.getAccessToken()
                                    .then(_=> FB.getPlacesDetails(place.id_facebook))
                                    .then(function (resp) {
                                        resolve(resp)
                                    })
                                    .catch(e=> {
                                        console.log("update failed:", e);
                                        resolve(null);
                                    })
                            }, 1000 * i);
                        })
                    }))
            })
            .then(R.filter(R.identity))
            .then(writeJSONFile(FACEBOOK_DETAILS_JSON))
    } else {
        promise = Promise.resolve(FACEBOOK_DETAILS_JSON);
    }

    return promise.then(readJSONFile)
        .then(details=> {
            var connection = new Connection();
            return connection.connect()

                .then(connection.collection.bind(connection,Tables.FACEBOOK_PLACES))

                .then(col=> Promise.all(details.map(place=> {
                    return col.findOneAndUpdate({id: place.id}, {$set:place}, {upsert: true, returnNewDocument: true}).then(function (r) {

                        if (!r.lastErrorObject.updatedExisting) {
                            return place;
                        } else {
                            return null;
                        }


                    }).catch(R.tap(e=> console.log("update failed:", e)))

                })))
                .then(function (response) {
                    console.log(response.length);
                    connection.db.close();
                    return response;
                }).catch(e=> {
                    console.log("fb details inseert failed:", e);
                    connection.db.close();

                    return e;
                })
        })

}


function getFacebookPlacesCollection() {
    var connection = new Connection();
    return connection.connect()
        .then(_=>Tables.FACEBOOK_PLACES)
        .then(connection.collection.bind(connection))
        .then(coll=> {
            return coll.find().toArray()
        })
        .then(R.tap(_=>connection.db.close()))
}

function getFacebookEvents({from_file=true}) {

    var promise;
    if (from_file) {
        promise = getFacebookPlacesCollection()
    } else {

        promise = Promise.reject("not implemented");
    }

    return promise.then(FBHelpers.getEvents)
        .then(items=> {
            var connection = new Connection();
            return connection.connect()
                .then(_=>Tables.MY_EVENTS)
                .then(connection.collection.bind(connection))
                .then(col=> Promise.all(items.map(item=>
                        col.findOneAndUpdate({id: item.id}, item, {upsert: true}))
                ))
                .then(function (response) {
                    console.log(response.length);
                    connection.db.close();
                    //process.exit(0);
                }).catch(e=> {
                    console.log("fb details inseert failed:", e);
                    connection.db.close();
                    //process.exit(1);
                    return e;
                })
        })

}
function getFacebookEventsRelations({from_file}) {

    var promise;
    if (from_file) {
        promise = getFacebookPlacesCollection()
    } else {

        promise = Promise.reject("not implemented");
    }

    promise.then(FBHelpers.getEvents)
        .then(items=> {
            var connection = new Connection();
            connection.connect()
                .then(_=>Tables.MY_EVENTS_RELATIONS)
                .then(connection.collection.bind(connection))
                .then(col=> Promise.all(items.map(item=> {
                    return col.findOneAndUpdate({id: item.id}, item, {upsert: true})

                })))
                .then(function (response) {
                    console.log(response);
                    connection.db.close();
                    //process.exit(0);
                }).catch(e=> {
                    console.log("fb details inseert failed:", e);
                    connection.db.close();
                    //process.exit(1);
                    return e;
                })
        })

}
function getGoogleDetails() {
    return readJSONFile(MY_PLACES_JSON)
        .then(R.filter(place=>place.id_google))
        // .then(places=>places.slice(0, 1))
        .then(google.getDetails)
        .then(R.filter(R.identity))
        .then(writeJSONFile(GOOGLE_DETAILS_JSON))
        .then(readJSONFile)
        .then(details=> {
            var connection = new Connection();
            connection.connect()
                .then(_=>Tables.GOOGLE_PLACES)
                .then(connection.collection.bind(connection))
                .then(col=> {

                    // return col.insertMany(details).then(function (r) {
                    //     if (details.length == r.insertedCount) {
                    //         return true;
                    //     } else {
                    //         throw false;
                    //     }
                    //     // Finish up test
                    //
                    // });
                    return Promise.all(details.map(place=> {
                        return col.findOneAndUpdate({place_id: place.place_id}, {$set: place}, {upsert: true})
                        // .then(function (r) {
                        //     console.log(r);
                        //     return r;
                        // }).catch(e=> {
                        //     console.log("update failed:", e);
                        //     return e;
                        // })
                    }));


                })
                .then(function (response) {
                    response = response.filter(item=> {
                        return !item.lastErrorObject.updatedExisting
                    })
                    console.log(response.length);
                    connection.db.close();
                    return response;
                    //process.exit(0);
                }).catch(e=> {
                    console.log("fb details inseert failed:", e);
                    connection.db.close();
                    //process.exit(1);
                    return e;
                })
        })
}
function updateInstagram() {
    // return readJSONFile("old/instagram.json")
//    var connection=new Connection();
//return connection.connect()
//    .then(connection.collection.bind(connection,Tables.FACEBOOK_PLACES))
//    .then(coll=>coll.find().toArray())
//    .then(R.tap(_=>connection.db.close()))
//    .then(geInstagram)
//    .then(writeJSONFile(INSTAGRAM_PHOTOS_JSON))
//    .then(readJSONFile);


    return readJSONFile(INSTAGRAM_PHOTOS_JSON).then(instagram_photos=> {
        var connection = new Connection();
        return connection.connect()
            .then(connection.collection.bind(connection, Tables.INSTAGRAM_PHOTOS))
            .then(coll=> {
                return coll.insertMany(instagram_photos)
                //return Promise.all(instagram_photos.map(photos=> {
                //    return coll.findOneAndUpdate({id: photos.id}, {$set: photos}, {upsert: true})
                //
                //}));
            }).then(function (response) {

                connection.db.close();
                return response;
                //process.exit(0);
            }).catch(e=> {
                console.log("instagram inseert failed:", e);
                connection.db.close();
                //process.exit(1);
                return e;
            })
    })
}

//updateFromOpendata({from_file: true});


// getFacebookPosts({from_file: true});
// getFacebookPhotos({from_file: true});


/*updatePlaces({from_file: false})
 .then(getFacebookDetails)*/
// getFacebookDetails().then(_=>getFacebookEvents({from_file: true}))
//     .then(_=>getFacebookEventsRelations({from_file: true}))
//     .then(_=> process.exit(0))
//     .catch(_=> console.log("errore!!!",_),process.exit(1));

// getFacebookDetails()
/**/
// updateMyPlaces()
//     .then(_=>{
//         console.log("FATTO!!")
//          process.exit(0);
//     })
//     .catch(_=> {
//         console.log("errore!!!", _); process.exit(1);
//     });

//getFacebookDetails({from_file: true})
getFacebookEvents({from_file: true})
    .then(_=> {
        console.log("FATTO!!")
        process.exit(0);
    })
    .catch(_=> {
        console.log("errore!!!", _);
        process.exit(1);
    });