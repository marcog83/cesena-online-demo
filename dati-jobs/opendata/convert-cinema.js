let {Converter} = require("csvtojson");
let fs = require("fs");
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/cesena-sociale';

function getJSON(name) {
    return new Promise(resolve=> {
        var converter = new Converter({delimiter: ";"});

//end_parsed will be emitted once parsing finished
        converter.on("end_parsed", function (jsonArray) {
            resolve(jsonArray); //here is your result jsonarray
        });

//read from file
        fs.createReadStream(`./${name}.csv`).pipe(converter);
    }).then(jsonArray=> {
        jsonArray = jsonArray.map(item=> {
            return Object.keys(item)
                .filter(key=>!["field19", "point_x", "point_y"].includes(key.toLowerCase()))
                .reduce((prev, key)=> {
                    prev[key.toLowerCase()] = item[key];
                    return prev
                }, {})
        });
        return new Promise(resolve=> {
            MongoClient.connect(url, function (err, db) {
                // Get the collection
                var col = db.collection(name);
                col.insertMany(jsonArray).then(function (r) {
                    if (jsonArray.length == r.insertedCount) {
                        resolve(true)
                    } else {
                        reject("non tutti insert")
                    }
                    // Finish up test
                    db.close();
                });
            });
        })


    })
}



Promise.all([
      getJSON("strutture-sanitarie")
    // ,getJSON("farmacie")
    // ,getJSON("piadinerie")
    // ,getJSON("luoghi-notevoli")
    // ,getJSON("teatri")
    // ,getJSON("cinema")
]).then(_=>process.exit(0))
    .catch(console.log.bind(console));
