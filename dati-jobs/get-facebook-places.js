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

