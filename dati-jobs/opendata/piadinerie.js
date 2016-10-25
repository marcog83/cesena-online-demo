var convert=require("./convert-to-json");
let fs = require("fs");
var google = require("../google-places/google-place");
var fb = require("../fb/fb-place");
var stringSimilarity = require('string-similarity');
var FOOD = [
    'bakery'
    , 'bar'
    , 'cafe'
    , 'food'
    , 'store'
    , 'grocery_or_supermarket'
    , "point_of_interest"
    , "establishment"
    , 'restaurant'

];
 
convert.getJSON("piadinerie")
    .then(results=> {
        return results.map(item=> {
            var full_address = [item.via
                .toLowerCase()
                .replace(/vle/, "viale")
                .replace(/ple/, "piazzale")
                .replace(/pza/, "piazza")
                .replace(/gno/, "giardino")];
            full_address.push(item.civico);
            full_address.push("47522 Cesena FC");
            return Object.assign({
                full_address: full_address.join(", ")
                , tags: ["piadineria"]
                , id: "piadineria_" + item.objectid
            }, item)
        })
    })
    .then(results=> {
        return Promise.all(results.map(function (item, i) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    var params = {
                        radius: "50"
                        , type: FOOD.join(",")
                        , name: undefined
                    };
                    google.getPlace(Object.assign({
                        location: {
                            latitude: item.latitudine
                            , longitude: item.longitudine

                        }
                        , name: ""
                    }, item), params).then(results=>({
                        opendata: item
                        , google: results.filter(resp=> {
                            return resp.types.every(type=>FOOD.includes(type))
                        })
                    })).then(function (response) {
                        resolve(response);
                    }).catch(e=>reject(e))
                }, i * 2000);
            })
        }))
    })
    .then(places=> {

        return places.map(place=> {
            place.google = place.google.map(g_place=> {
                var percent = stringSimilarity.compareTwoStrings(g_place.name, place.opendata.titolare);
                // var comparation = (g_place.name + "," + place.fb.name + "," + percent);
                var comparation = `"${g_place.name.replace(/"|;/g, "")}";"${place.opendata.titolare.replace(/"|;/g, "")}";"${percent}";`;


                if (percent < .4) {
                    if (place.google.length > 1) {
                        if (g_place.name == "La Mia Piadina acqua e farina Di Bardi e Cangini s.n.c"
                            && place.opendata.titolare == "RICCI DONATELLA") {
                            g_place.__percent = 1;
                        }
                        if (g_place.name == "Micamat Piadineria"
                            && place.opendata.titolare == "GIULIANINI MICHELA") {
                            g_place.__percent = 1;
                        }
                        if (g_place.name == "Piadina di Calabrina"
                            && place.opendata.titolare == "GRIFFI MARTA") {
                            g_place.__percent = 1;
                        }
                        if (g_place.name == "La Piadina 5 Stelle"
                            && place.opendata.titolare == "NDREGJONI ADRIANO") {
                            g_place.__percent = 1;
                        }
                    } else {
                        g_place.__percent = 1;
                    }

                } else {
                    g_place.__percent = percent;
                }


                return g_place
            }).filter(function (g_place) {
                return g_place.__percent >= .4;
            });
            place.google = place.google.sort(function (a, b) {
                    if (a.__percent < b.__percent) {
                        return 1;
                    }
                    if (a.__percent > b.__percent) {
                        return -1;
                    }

                    return 0;
                })[0] || {};

            return place;
        });
    })

    .then(function (places) {
        return Promise.all(places.map((place,i)=> {

            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    fb.getPlaceFromLocation(place.opendata).then(response=> {
                        return Object.assign({
                            facebook: response
                        }, place)
                    })
                        .then(response=> {
                            resolve(response)
                        }).catch(e=>reject(e))
                }, i * 1000)
            })


        }))
    })
    .then(function (results) {
        console.log('onResult: ' + results);
        return new Promise(function (resolve, reject) {
            fs.writeFile("piadinerie-google-places-da-filtrare.json", JSON.stringify(results), function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve("DONE")

            });
        })
    })
    .then(_=>process.exit(0))
    .catch(console.log.bind(console));
