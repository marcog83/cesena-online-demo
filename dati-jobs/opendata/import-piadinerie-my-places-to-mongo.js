/**
 * Created by mgobbi on 04/04/2016.
 */
// Using require() in ES2015
// Using require() in ES5


var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/cesena-sociale';

Promise.resolve(JSON.parse(fs.readFileSync("piadinerie-details.json")))
    .then(places=>places

        .map(place=>({
            name: place.opendata.titolare
            , location: {
                lng: place.opendata.longitudine
                , lat: place.opendata.latitudine
            }
            , id_opendata: place.opendata.objectid
            , id_facebook: null
            , id_google: place.google ? place.google.place_id : null
        })))
    .then(function (places) {

        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                // Get the collection
                var col = db.collection('my-places');

                var promises = places.map(place=> {
                    return col.findOneAndUpdate({id_opendata: place.id_opendata}, place, {upsert: true})

                });
                resolve(Promise.all(promises).then(_=> {
                    db.close();
                }).catch(_=> {
                    db.close();
                }));
                

            });


        });
    })
    .then(function (e) {
        console.log("OK");
        process.exit(0);
    }, function (e) {
        console.log("KO", e);
        process.exit(1);
    })

