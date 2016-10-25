var convert = require("./convert-to-json");
var google = require("../google-places/google-place");
var fb = require("../fb/fb-place");
var stringSimilarity = require('string-similarity');
let fs = require("fs");


exports.getOpenData = function () {
   return Promise.all([
        // getJSON("strutture-sanitarie")
        // ,getJSON("farmacie")
        // ,getJSON("piadinerie")
        // ,getJSON("luoghi-notevoli")
        convert.getJSON("teatri")
        , convert.getJSON("cinema")
    ])
        .then(([teatri,movies])=> {
            return teatri.map(teatro=> {
                return Object.assign(teatro, {original_id:teatro.id,id: "teatro_" + teatro.id, tags: ["teatro"]})
            }).concat(movies.map(movie=> {
                return Object.assign(movie, {original_id:movie.id,id: "movie_" + movie.id, tags: ["movie"]})
            }))
        })
        .then(results=> {
            return Promise.all(results.map(function (item, i) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        var params = {
                            radius: "50"
                            // , type: FOOD.join(",")
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
                            , google: results
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
                    var percent = stringSimilarity.compareTwoStrings(g_place.name, place.opendata.nome);
                    // var comparation = (g_place.name + "," + place.fb.name + "," + percent);
                    var comparation = `"${g_place.name.replace(/"|;/g, "")}";"${place.opendata.nome.replace(/"|;/g, "")}";"${percent}";`;


                    g_place.__percent = percent;


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
            return Promise.all(places.map((place, i)=> {

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
        .then(places=> {

            return places.map(place=> {
                place.facebook = place.facebook.map(fb_place=> {
                    var percent = stringSimilarity.compareTwoStrings(fb_place.name, place.opendata.nome);
                    // var comparation = (g_place.name + "," + place.fb.name + "," + percent);
                    var comparation = `"${fb_place.name.replace(/"|;/g, "")}";"${place.opendata.nome.replace(/"|;/g, "")}";"${percent}";`;


                    fb_place.__percent = percent;


                    return fb_place
                }).filter(function (fb_place) {
                    return fb_place.__percent >= .4;
                });
                place.facebook = place.facebook.sort(function (a, b) {
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
        .then(response=> {
            return Promise.resolve(JSON.parse(fs.readFileSync("piadinerie-google-places-filtrate-mano.json")))
                .then(piadinerie=>piadinerie.concat(response));
        })
};
