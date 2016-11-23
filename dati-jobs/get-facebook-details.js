var fs = require("fs-promise");
var FB = require("./fb/fb-place");
var Connection = require("./db/db-connection").Connection;
var Tables = require("./db/tables");

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
        promise = readJSONFile(File.FB_PLACES_JSON)

            .then(places=> {
                return Promise.all(places
                    .map((place, i)=> {
                        return new Promise((resolve, reject)=> {
                            setTimeout(_=> {
                                FB.getAccessToken()
                                    .then(_=> FB.getPlacesDetails(place.id))
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

                .then(col=> Promise.all(details
                    .filter(place=>Object.keys(place).length)
                    .map(place=> {
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

getFacebookDetails({from_file:true});