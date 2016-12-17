var Connection = require("./db/db-connection").Connection;
var Tables = require("./db/tables");
const R = require("ramda");
const fs = require("fs");
var clj_fuzzy = require('clj-fuzzy');
const geolib = require('geolib');
var logger = fs.createWriteStream('log-fb.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
});

var double_metaphone = R.memoize(clj_fuzzy.phonetics.double_metaphone);

function _trovaByName(places, {name, id, address, lat, lng}) {

    var results = [], length = places.length;
    for (var i = 0; i < length; i++) {
        var place = places[i];
        var percent_name = clj_fuzzy.metrics.dice(name, place.name);
        if (id != place.id && percent_name > 0.5) {
            let name_p1 = name;
            let name_p2 = place.name;
            let percent_name = clj_fuzzy.metrics.dice(name_p1, name_p2);
            let a1 = double_metaphone(address)[0];
            let a2 = double_metaphone(place.address)[0];
            let percent_address_phonetic = clj_fuzzy.metrics.dice(a1, a2);
            let distance = 1000000000;
            if (lat && lng && place.lat && place.lng) {
                distance = geolib.getDistance({latitude: lat, longitude: lng}, {
                    latitude: place.lat,
                    longitude: place.lng
                }, 1, 3);
            }
            var log = `${percent_name.toFixed(4)} | ${name_p1} => ${name_p2}
${address} => ${place.address} | ${distance} m | ${percent_address_phonetic.toFixed(4)} 
---------\n`;
            try {
                console.log(log);
                logger.write(log);
            } catch (e) {
                console.log(e);
            }

            results.push({
                id_p1: id,
                id_p2: place.id,
                name_p1,
                name_p2,
                address_p1: address,
                address_p2: place.address,
                percent_name,
                percent_address_phonetic,
                distance
            })
        }
    }

    return results;
}
var trovaByName = R.curryN(2, _trovaByName);
var guess = R.curryN(2, (config, place)=> {
    var values = R.values(config);
    var results = [], length = values.length;
    for (var i = 0; i < length; i++) {
        var fn = values[i];

        results.push(fn(place));
    }

    return results;
});
var connection = new Connection();
connection.connect()
    .then(connection.collection.bind(connection, Tables.FACEBOOK_PLACES))
    .then(coll=> {
        return coll.find().toArray().then(R.map(place=>({
            name: place.name,
            id: place.id,
            address: `${place.location.street}, ${place.location.zip}, ${place.location.city}`
            , lat: place.location.latitude
            , lng: place.location.longitude
        })))
    })
    .then(fbPlaces=> {
        var length = Math.round(fbPlaces.length / 2);
        var comparison = fbPlaces.slice(length);
        var fb_fn = trovaByName(comparison);
        var fb_config = {
            facebook: fb_fn
        };
        var fbResults = R.compose(R.flatten, R.map(guess(fb_config)))(fbPlaces.slice(0, length));
        var fuzzyMatchColl = connection.db.collection(Tables.FUZZY_MATCHES_FB);
        return fuzzyMatchColl.insertMany(fbResults);
    })
    .then(_=> {
        connection.db.close();
        logger.end(); // close string
        console.log("DONE");
        process.exit(0);
    })
    .catch(_=> {
        console.log(_);
        logger.end(); // close string
        connection.db.close();
        process.exit(1);
    });