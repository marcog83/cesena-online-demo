/**
 * Created by mgobbi on 04/04/2016.
 */
// Using require() in ES2015
// Using require() in ES5


 var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/cesena-sociale';

function getPlaces() {
    return new Promise(function (resolve, reject) {
        var routes = [];
        for(var i=1;i<6;i++){
            var _routes=JSON.parse(fs.readFileSync("routes_"+i+".json")).routes;
        routes=routes.concat(_routes)
        }

        resolve(routes)
    })
}





// FACEBOOK

getPlaces().then(function (routes) {

    return new Promise(function (resolve, reject) {

        MongoClient.connect(url, function (err, db) {
            // Get the collection
            var col = db.collection('runtastic-routes');
            col.insertMany(routes).then(function (r) {
                if (routes.length == r.insertedCount) {
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

