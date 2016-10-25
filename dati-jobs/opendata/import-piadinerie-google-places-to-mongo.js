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
        .filter(place=>place.google)
        .map(place=>place.google))
    .then(function (places) {

        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                // Get the collection
                var col=db.collection('google-places');
                var promises = places.map(place=> {
                    return col.findOneAndUpdate({place_id:place.place_id},place,{upsert:true})

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

