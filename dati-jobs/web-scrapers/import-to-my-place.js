var Connection = require("../db/db-connection").Connection;
var Tables = require("../db/tables");
var R = require("ramda");

const fs = require("fs");
const stringSimilarity = require('string-similarity');
function findGoogle(impresa, google_places) {
    var result = R.find(place=> {
            var percent = stringSimilarity.compareTwoStrings(impresa.name
                , place.name);
            if (percent > .86) {
                console.log("N: ", impresa.name, " => ", place.name, percent);
                return true
            } else {

                if (percent > .8) {
                    if (!impresa.address || !place.formatted_address) {
                        console.log("N: ", impresa.name, " => ", place.name, percent);
                        console.log("A: no address");
                        console.log("--------------");
                        return false;
                    }
                    var percentAddress = stringSimilarity.compareTwoStrings(impresa.address
                        , place.formatted_address);


                    if (percentAddress > 0.6) {
                        console.log("N: ", impresa.name, " => ", place.name, percent);
                        console.log("A: ", impresa.address, " => ", place.formatted_address, percentAddress);
                        console.log("--------------");
                        return true;
                    } else if (percentAddress <= 0.6 && percentAddress > .2) {
                        var telephone = (place.international_phone_number || "")
                            .replace("+39", "")
                            .replace(/ /g, "");


                        if (!telephone) {
                            console.log("N:KO", impresa.name, " => ", place.name, percent);
                            console.log("A:KO", impresa.address, " => ", place.formatted_address, percentAddress);
                            console.log("--------------");
                            return false;
                        }
                        var phone = parseInt(impresa.telephone) == parseInt(telephone);

                        if (phone) {
                            console.log("N: ", impresa.name, " => ", place.name, percent);
                            console.log("A: ", impresa.address, " => ", place.formatted_address, percentAddress);
                            console.log("P: ", impresa.telephone, " => ", telephone, phone);
                            console.log("--------------");
                            return true;
                        } else {
                            console.log("N:kO", impresa.name, " => ", place.name, percent);
                            console.log("A:kO", impresa.address, " => ", place.formatted_address, percentAddress);
                            console.log("P:kO", impresa.telephone, " => ", telephone, phone);

                            console.log("--------------");
                            return false;
                        }
                    } else {
                        console.log("N:kO", impresa.name, " => ", place.name, percent);
                        console.log("A:kO", impresa.address, " => ", place.formatted_address, percentAddress);

                        console.log("--------------");
                        return false;
                    }

                } else {
                    return false;
                }

            }

        }, google_places) || {};


    return {
        name: result.name
        , address: result.formatted_address
        , types: result.types
        , place_id: result.place_id
        , geo: result.geometry && result.geometry.location

    }
}

function findbyName(impresa, my_places) {
    var threshold=0.781;
    return R.find(place=> {
            var percent = stringSimilarity.compareTwoStrings(impresa.impresa.name
                , place.name);
            percent > threshold && console.log(impresa.impresa.name, "=>", place.name,percent);
            return percent > threshold;
        }, my_places) || {};

}

function importToMDB() {
    var connection = new Connection();
    connection.connect()
        .then(db=> {
            //var collmy = db.collection(Tables.MY_PLACES);
            var collimprese = db.collection(Tables.IMPRESE);
            var collgoo = db.collection(Tables.GOOGLE_PLACES);
            return Promise.all([
                collimprese.find().toArray()
                , collgoo.find().toArray()
            ])

        })
        .then(([imprese,google_places])=> {
            return imprese.map(impresa=> {
                var result = {
                    name: impresa.name
                    , telephone: impresa.telephone
                    , address: impresa.address
                    , id: impresa._id
                };
                var google = findGoogle(impresa, google_places);
                return {
                    impresa,
                    google
                }
            })
        })
        .then(imprese=> {
            fs.writeFileSync("google-impresa-veloce.json", JSON.stringify(imprese));
            var myColl = connection.db.collection(Tables.MY_PLACES_2);
            return Promise.all([
                Promise.resolve(imprese)
                , myColl.find().toArray()
            ])


        })
        .then(([imprese,my_places])=> {
            console.log("\n\n\n\n\n");
            return imprese.map(impresa=> {
                if (impresa.google) {
                    var my_place = R.find(place=>place.id_google == impresa.google.place_id, my_places);
                    if (my_place) {

                        return Object.assign({my_place}, impresa);
                    } else {
                        return findbyName(impresa, my_places);
                    }
                } else {
                    return findbyName(impresa, my_places);
                }
            })
        })
        .then(imprese=> {
            fs.writeFileSync("myplaces-google-impresa-veloce.json", JSON.stringify(imprese));
        })
        .then(R.tap(_=>connection.db.close()))

        .then(R.tap(_=>process.exit(0)))
        .catch(R.tap(_=> {
            console.log(_);
            connection.db.close()
            process.exit(1);
        }));
}


function getMyPlaces() {
    Promise.resolve(JSON.parse(fs.readFileSync("google-impresa-veloce.json")))

        .then(imprese=> {
            var connection = new Connection();
            return connection.connect()
                .then(db=> {
                    var myColl = db.collection(Tables.MY_PLACES_2);
                    return Promise.all([
                        Promise.resolve(imprese)
                        , myColl.find().toArray()
                    ])
                })
                .then(R.tap(_=>connection.db.close()))
                .catch(R.tap(_=>connection.db.close()))


        })
        .then(([imprese,my_places])=> {
            console.log("\n\n\n\n\n");
            return imprese.map(impresa=> {
                if (impresa.google &&impresa.google.place_id) {
                    var my_place = R.find(place=>place.id_google == impresa.google.place_id, my_places);
                    if (my_place) {
                        console.log(my_place.name);
                        return Object.assign({my_place}, impresa);
                    } else {
                        my_place=findbyName(impresa, my_places);
                        return Object.assign({my_place}, impresa);
                    }
                } else {
                    my_place=findbyName(impresa, my_places);
                    return Object.assign({my_place}, impresa);
                }
            })
        })
        .then(imprese=> {
            fs.writeFileSync("myplaces-google-impresa-veloce.json", JSON.stringify(imprese));
        })
        .then(R.tap(_=>process.exit(0)))
        .catch(R.tap(_=> {
            console.log(_);

            process.exit(1);
        }));
}


importToMDB()
//getMyPlaces()
//.then(R.tap(_=>connection.db.close()))
//.catch(R.tap(_=>connection.db.close()))