const Connection = require("./db/db-connection").Connection;
const Tables = require("./db/tables");
const R = require("ramda");
const fs = require("fs");
var clj_fuzzy = require('clj-fuzzy');
const geolib = require('geolib');
function _trovaByName(places, {name, id, address,lat,lng}) {
    var xf = R.compose(R.filter(place=> {
        return clj_fuzzy.metrics.dice(name, place.name) > 0.5;
    }), R.map(place=> {
        let name_p1 = name;
        let name_p2 = place.name;
        let percent_name = clj_fuzzy.metrics.dice(name_p1, name_p2);
        let a1=clj_fuzzy.phonetics.double_metaphone(address)[0];
        let a2=clj_fuzzy.phonetics.double_metaphone(place.address)[0];
        let percent_address_phonetic = clj_fuzzy.metrics.dice(a1, a2);
        let percent_address_metric = clj_fuzzy.metrics.dice(address, place.address);
        let distance=1000000000;
if(lat && lng && place.lat && place.lng){
    distance=geolib.getDistance({latitude:lat,longitude:lng},{latitude:place.lat,longitude:place.lng}, 1, 3);
}
//         console.log(`${percent_name.toFixed(4)} | ${name_p1} => ${name_p2}
// ${address} => ${place.address} | ${distance} m | ${percent_address_phonetic.toFixed(4)} | ${percent_address_metric.toFixed(4)}
// ---------`);
        return {
            id_p1: id,
            id_p2: place.id,
            name_p1,
            name_p2,
            address_p1: address,
            address_p2: place.address,
            percent_name,
            percent_address_phonetic,
            percent_address_metric,
            distance
        }
    }));
    return R.into([], xf, places)
}
var trovaByName = R.curryN(2, _trovaByName);
var guess = R.curryN(2, (config, place)=> {
    return Object.keys(config).map(key=>config[key](place));
});
var connection = new Connection();
connection.connect()
    .then(db=> {
        var fbColl = db.collection(Tables.FACEBOOK_PLACES);
        var googColl = db.collection(Tables.GOOGLE_PLACES);
        var openColl = db.collection(Tables.OPENDATA_PLACES);
        var impreColl = db.collection(Tables.IMPRESE);
        return Promise.all([fbColl.find().toArray().then(R.map(place=>({
            name: place.name,
            id: place.id,
            address: `${place.location.street}, ${place.location.zip}, ${place.location.city}`
            ,lat:place.location.latitude
            ,lng:place.location.longitude
        }))), googColl.find().toArray().then(R.map(place=>({
            name: place.name
            , id: place.place_id
            , address: place.formatted_address||""
            ,lat:place.geometry.location.lat
            ,lng:place.geometry.location.lng

        }))), impreColl.find().toArray().then(R.map(place=>({
            name: place.name
            , id: place._id.toString()
            , address: place.address||""
        }))), openColl.find().toArray().then(R.map(place=>(
        {
            name: place.name
            , id: place.id
            , address: place.full_address || place.indirizzo||""
            ,lat:place.latitudine
            ,lng:place.longitudine
        })))])
    })
    .then(([fbPlaces,googlePlaces,imprePlaces,openPlaces])=> {
        var fb_fn = trovaByName(fbPlaces);
        //var goog_fn = trovaByName(googlePlaces);
        var open_fn = trovaByName(openPlaces);
        var imprese_fn = trovaByName(imprePlaces);
        //google con fb,open,imprese
        //fb con open,imprese
        //open con imprese
        var goog_config = {
            facebook: fb_fn,
            opendata: open_fn,
            impresa: imprese_fn
        };
        var fb_config = {
            opendata: open_fn,
            impresa: imprese_fn
        };
        var open_config = {
            impresa: imprese_fn
        };

        //
        var googleResults = R.compose(R.flatten, R.map(guess(goog_config)))(googlePlaces);
        var fbResults = R.compose(R.flatten, R.map(guess(fb_config)))(fbPlaces);
        var openResults = R.compose(R.flatten, R.map(guess(open_config)))(openPlaces);

        var fuzzyMatchColl = connection.db.collection(Tables.FUZZY_MATCHES);
        return fuzzyMatchColl.insertMany(fbResults.concat(googleResults).concat(openResults));
    })
    .then(_=>{
        connection.db.close();
        console.log("DONE");
        process.exit(0);
    })
    .catch(_=> {
        console.log(_);
        connection.db.close();
        process.exit(1);
    });