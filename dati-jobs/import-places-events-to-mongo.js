/**
 * Created by mgobbi on 04/04/2016.
 */
// Using require() in ES2015
// Using require() in ES5


 var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;

var R = require('ramda');
var url = 'mongodb://localhost:27017/cesena-sociale';

function getPlaces() {
    return new Promise(function (resolve, reject) {
        var places1 = JSON.parse(fs.readFileSync("places.json"));
        var places2 = JSON.parse(fs.readFileSync("places-2.json"));
        resolve(places1.concat(places2))
    })
}


function getPlace(place, i) {
    return (place.events && place.events.data || []).map(event=>{
        return Object.assign({},event,{
            place:(event.place && event.place.id || place.id)
        })
    })

}


// FACEBOOK

getPlaces().then(function (places) {
    return R.flatten(places.map(getPlace));
}).then(function (places) {

    return new Promise(function (resolve, reject) {

        MongoClient.connect(url, function (err, db) {
            // Get the collection
            var col = db.collection('facebook-events');
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

