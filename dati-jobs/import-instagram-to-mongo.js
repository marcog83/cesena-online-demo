/**
 * Created by mgobbi on 04/04/2016.
 */
// Using require() in ES2015
// Using require() in ES5


 var R = require("ramda");
 var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/cesena-sociale';

function getPlaces() {
    return new Promise(function (resolve, reject) {
        var instagram = JSON.parse(fs.readFileSync("instagram.json"));

        resolve(instagram)
    })
}





// FACEBOOK

getPlaces()
    .then(instagram=>{
        return R.flatten(instagram.map(i=>{
            return i.instagram_photos.map(photo=>{
                return Object.assign({facebook_place_id:i.id},photo)
            })
        }))
    })
    .then(function (instagram) {

    return new Promise(function (resolve, reject) {

        MongoClient.connect(url, function (err, db) {
            // Get the collection
            var col = db.collection('instagram-photos');
            col.insertMany(instagram).then(function (r) {
                if (instagram.length == r.insertedCount) {
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

