/**
 * Created by mgobbi on 04/04/2016.
 */
// Using require() in ES2015
// Using require() in ES5


 var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/cesena-sociale';

 Promise.resolve(JSON.parse(fs.readFileSync("fb-and-google-places-filtered.json")))
     .then(places=>places
         .filter(place=>Object.keys(place.google).length)
         .map(place=>{
             delete place.google.__percent;
             return place.google;
         }))
     .then(function (places) {

    return new Promise(function (resolve, reject) {

        MongoClient.connect(url, function (err, db) {
            // Get the collection
            var col = db.collection('google-places');
            col.insertMany(places).then(function (r) {
                if (places.length == r.insertedCount) {
                    resolve(true)
                } else {
                    reject("non tutti insert")
                }
                // Finish up test
                db.close();
            });
        });
    })

}).then(function (e) {
    console.log("OK");
    process.exit(0);
}, function (e) {
    console.log("KO", e);
    process.exit(1);
})

