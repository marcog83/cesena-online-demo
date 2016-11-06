var Connection = require("../db/db-connection").Connection;
var Tables = require("../db/tables");
var R = require("ramda");
var fs = require("fs");

function importToMDB() {
    Promise.resolve(JSON.parse(fs.readFileSync("imprese-google-2.json")))
        .then(R.compose(
            R.map(impresa=>impresa.google.results)
            , R.filter(impresa=> {
                return impresa.google.results && impresa.google.results.length > 0
            })))
        .then(R.flatten)
        .then(imprese=> {
            var connection = new Connection();
            return connection.connect()
                .then(db=> {
                    var coll = db.collection(Tables.GOOGLE_PLACES);
                    return Promise.all(imprese.map(impresa=>{
                        return coll.findOneAndUpdate({place_id:impresa.place_id},{$set:impresa},{upsert:true})
                    }))

                        .then(R.tap(_=>connection.db.close()))
                        .catch(R.tap(_=>connection.db.close()))

                })
        })
        .then(R.tap(_=>process.exit(0)))
        .catch(R.tap(_=>process.exit(1)));
}
importToMDB()