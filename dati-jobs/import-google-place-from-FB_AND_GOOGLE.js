var fs = require("fs-promise");
var R = require('ramda');
let Connection = require("./db/db-connection").Connection;
let Tables = require("./db/tables");
const File = require("./files_name");
const connection = new Connection();
//
let xf = R.compose(R.filter(place=>place.google && place.google.length), R.map(R.prop("google")));
//
Promise.all([connection.connect()
    .then(connection.collection.bind(connection, Tables.GOOGLE_PLACES)), Promise.resolve(JSON.parse(fs.readFileSync(File.FB_AND_GOOGLE_PLACES_JSON)))
    .then(R.compose(R.flatten, R.into([], xf)))])
    .then(([googColl,googPlaces])=> {
        var promises = googPlaces.map(place=> {
            return googColl.findOneAndUpdate({place_id: place.place_id}, {$set: place}, {upsert: true});
        });
        return Promise.all(promises)
    })
    .then(_=> {
        console.log("DONE");
        connection.db.close();
        process.exit(0);

    })
    .catch(e=> {
        console.log(e);
        connection.db.close();
        process.exit(1);
    });
