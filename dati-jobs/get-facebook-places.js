var fs = require("fs-promise");
var {getOpenData}=require("./opendata/get-opendata");
//var {getPlaces, getPlacesDetails, getInstagram, getAccessToken}=require("./fb/fb-place");
var FB = require("./fb/fb-place");

var google = require("./google-places/google-place");
// var {findSimilarityGoogleFB} = require("./filtra-fb-google");
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










function getGoogleDetails() {
    return readJSONFile(File.MY_PLACES_JSON)
        .then(R.filter(place=>place.id_google))

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

