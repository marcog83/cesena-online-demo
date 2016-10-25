/**
 * Created by mgobbi on 04/04/2016.
 */
// Using require() in ES2015
// Using require() in ES5


 var fs = require("fs");
 var categories = require("./category-list");
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/cesena-sociale';

function getPlaces() {
    return new Promise(function (resolve, reject) {


        resolve(categories)
    })
}





// FACEBOOK

getPlaces().then(function (categories) {

    return new Promise(function (resolve, reject) {

        MongoClient.connect(url, function (err, db) {
            // Get the collection
            var col = db.collection('facebook-categories');
            col.insertMany(categories).then(function (r) {
                if (categories.length == r.insertedCount) {
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

