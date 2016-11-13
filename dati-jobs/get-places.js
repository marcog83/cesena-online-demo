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
const File=require("./files_name");


function writeJSONFile(filename) {
    return function (fb_places) {
        return fs.writeFile(filename, JSON.stringify(fb_places)).then(_=>filename);
    }
}
function readJSONFile(filename) {
    return Promise.resolve(JSON.parse(fs.readFileSync(filename)));
}



function getFacebookDetails({from_file=true}) {
    var promise;
    if (!from_file) {
        promise = readJSONFile(File.MY_PLACES_JSON)
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
            .then(writeJSONFile(File.FACEBOOK_DETAILS_JSON))
    } else {
        promise = Promise.resolve(File.FACEBOOK_DETAILS_JSON);
    }

    return promise.then(readJSONFile)
        .then(details=> {
            var connection = new Connection();
            return connection.connect()

                .then(connection.collection.bind(connection, Tables.FACEBOOK_PLACES))

                .then(col=> Promise.all(details.map(place=> {
                    return col.findOneAndUpdate({id: place.id}, {$set: place}, {
                        upsert: true,
                        returnNewDocument: true
                    }).then(function (r) {

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
    return readJSONFile(File.MY_PLACES_JSON)
        .then(R.filter(place=>place.id_google))
        // .then(places=>places.slice(0, 1))
        .then(google.getDetails)
        .then(R.filter(R.identity))
        .then(writeJSONFile(File.GOOGLE_DETAILS_JSON))
        .then(readJSONFile)
        .then(details=> {
            var connection = new Connection();
            connection.connect()
                .then(_=>Tables.GOOGLE_PLACES)
                .then(connection.collection.bind(connection))
                .then(col=> {

                    return Promise.all(details.map(place=> {
                        return col.findOneAndUpdate({place_id: place.place_id}, {$set: place}, {upsert: true});

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
     return readJSONFile(File.INSTAGRAM_PHOTOS_JSON).then(instagram_photos=> {
        var connection = new Connection();
        return connection.connect()
            .then(connection.collection.bind(connection, Tables.INSTAGRAM_PHOTOS))
            .then(coll=> {
                return Promise.all(instagram_photos.map(photos=> {
                   return coll.findOneAndUpdate({id: photos.id}, {$set: photos}, {upsert: true})

                }));
            }).then(function (response) {
                connection.db.close();
                return response;
            }).catch(e=> {
                console.log("instagram inseert failed:", e);
                connection.db.close();
                return e;
            })
    })
}



function importFBPlaces(){
    return readJSONFile(File.FB_PLACES_JSON)
        .then(fb_places=> {
            var connection = new Connection();
            return connection.connect()
                .then(db=> {
                    var coll = db.collection(Tables.FACEBOOK_PLACES);
                    var promises = fb_places.map(place=> {
                        return coll.findOneAndUpdate({id: place.id}, {$set: place}, {upsert: true})
                    });
                    return Promise.all(promises);
                })
                .then(_=> {
                    connection.db.close();
                })
                .catch(_=> {
                    connection.db.close();
                })
        })
        .then(_=> {
            console.log("FATTO!!");
            // process.exit(0);
        })
        .catch(_=> {
            console.log("errore!!!", _);
            // process.exit(1);
        });
}

//
FB.getPlaces().then(writeJSONFile(File.FB_PLACES_JSON))
    .then(importFBPlaces)
    .then(_=> {
        console.log("FATTO!!");
        process.exit(0);
    })
    .catch(_=> {
        console.log("errore!!!", _);
        process.exit(1);
    });

