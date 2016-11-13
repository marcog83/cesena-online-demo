/**
 * Created by mgobbi on 04/04/2016.
 */
    // Using require() in ES2015
    // Using require() in ES5


var fs = require("fs");
var R = require("ramda");
var Connection = require("../db/db-connection").Connection;
var Tables=require("../db/tables");
var File=require("../files_name");
const xf=R.compose(
    R.filter(place=>place.facebook.id)
    ,R.map(place=>place.facebook)
);

Promise.resolve(JSON.parse(fs.readFileSync(File.PIADINERIE_GOOGLE_OPENDATA_HAND_FILTERED)))
    .then(R.into([],xf))
    .then( places =>{
        var connection=new Connection();
        return connection.connect()
            .then(connection.collection.bind(connection,Tables.FACEBOOK_PLACES))
            .then(coll=>{
                var promises = places.map(place=> {
                    return coll.findOneAndUpdate({id:place.id},{$set:place},{upsert:true})
                });
                return Promise.all(promises);
            })
            .then(R.tap(_=>connection.db.close()))
            .catch(R.tap(_=>connection.db.close()))

    })
    .then(function (e) {
        console.log("OK");
        process.exit(0);
    }, function (e) {
        console.log("KO", e);
        process.exit(1);
    });

