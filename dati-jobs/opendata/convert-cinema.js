let {Converter} = require("csvtojson");
let fs = require("fs");
let fromCSV = require("./convert-to-json");
var Connection = require("../db/db-connection").Connection;
const Tables = require("../db/tables");
const R = require("ramda");
var connection = new Connection();

// ,getJSON("farmacie")
// ,getJSON("piadinerie")
// ,getJSON("luoghi-notevoli")
// ,getJSON("teatri")
// ,getJSON("cinema")

Promise.all([
    fromCSV.getJSON("cinema").then(R.map(cinema=> {
        return Object.assign({tags: ["cinema"]}, cinema, {id: "cinema_" + cinema.id,name:cinema.nome});
    }))
    , connection.connect().then(connection.collection.bind(connection, Tables.OPENDATA_PLACES))

]).then(([cinemas,coll])=> {
    var ps = cinemas.map(cinema=> {
        return coll.findOneAndUpdate({id: cinema.id}, {$set: cinema}, {upsert: true});
    });
    return Promise.all(ps);
})
    .then(R.tap(_=>connection.db.close()))
    .then(_=>process.exit(0))
    .catch(R.tap(_=>connection.db.close()));
