const Connection = require("./db/db-connection").Connection;
const Tables = require("./db/tables");
const R = require("ramda");
const fs = require("fs");
const stringSimilarity = require('string-similarity');
const hoursHelper = require("../fe-web/opening_hours-helper");
var trovaAttraversoNome = R.curryN(2, function (place, places) {
    var placeFound = R.find(mp=> {
        return stringSimilarity.compareTwoStrings(mp.name, place.name) >= .85;
    }, places);
    return placeFound ? placeFound.id : null
});
var transformaID = (function (a, transformer) {
    return function (b) {
        if (b) {
            return transformer(a, b)
        }
        return b
    }
});

var findOtherFn = function (a, callback) {
    return function () {
        return callback(a);
    }
};


function getCategories(facebook, google, opendata) {
    var fb = (R.view(R.lensPath(["category_list"]), facebook) || []).map(cat=>cat.name);
    var goog = (R.view(R.lensPath(["types"]), google) || []);
    var open = (R.view(R.lensPath(["tags"]), opendata) || []);
    return fb.concat(goog).concat(open);
}
function getOtherPhotos(detail) {
    return (R.view(R.lensPath(["photos"]), detail) || []).map(googleImage=> {
        var image_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${googleImage.width}&maxheight=${googleImage.height}&photoreference=${googleImage.photo_reference}&key=${KEY}`.trim();
        return {
            image: image_url
            , description: ""
            , rating: null
            , comments: null
        }
    })
}

var connection = new Connection();

connection.connect()
    .then(db=> {
        var fbColl = db.collection(Tables.FACEBOOK_PLACES);
        var googColl = db.collection(Tables.GOOGLE_PLACES);
        var myColl = db.collection(Tables.MY_PLACES);
        var openColl = db.collection(Tables.OPENDATA_PLACES);

        return Promise.all([
            fbColl.find().toArray().then(R.map(place=>({name: place.name, id: place.id})))
            , googColl.find().toArray().then(R.map(place=>({name: place.name, id: place.place_id})))
            , myColl.find().toArray().then(R.map(place=> {
                return {
                    name: place.name,
                    "id_facebook": place.id_facebook || null,
                    "id_google": place.id_google || null,
                    "id_opendata": place.id_opendata || null
                }
            }))
            , openColl.find().toArray().then(R.map(place=>({name: place.name, id: place.id})))
        ])
    })
    .then(([fbPlaces,googlePlaces,myPlaces,opendata])=> {
        var mapFunction = function (predicato, fn_to_find) {
            return a=> {
                let b = R.find(predicato(a), myPlaces);

                if (b) {
                    return b;
                } else {
                    return fn_to_find(a)(myPlaces);

                }
            }
        };
        var fb = {
            transformer: function (a, b) {
                b.id_facebook = a.id;
                return b;
            }
            , others: function (a) {
                return {
                    id_facebook: a.id
                    , id_google: trovaAttraversoNome(a, googlePlaces)
                    , id_opendata: trovaAttraversoNome(a, opendata)
                }
            }
            , predicate: function (a) {
                return function (place) {
                    return a.id == place.id_facebook;
                }
            }
        };

        var goog = {
            transformer: function (a, b) {
                return Object.assign(b, {id_google: a.id});

            }
            , others: function (a) {
                return {
                    id_facebook: trovaAttraversoNome(a, fbPlaces)
                    , id_google: a.id
                    , id_opendata: trovaAttraversoNome(a, opendata)
                }
            }
            , predicate: function (a) {
                return function (place) {
                    return a.id == place.id_google;
                }
            }
        };
        var open = {
            transformer: function (a, b) {
                return Object.assign(b, {id_opendata: a.id});

            }
            , others: function (a) {
                return {
                    id_facebook: trovaAttraversoNome(a, fbPlaces)
                    , id_google: trovaAttraversoNome(a, googlePlaces)
                    , id_opendata: a.id
                }
            }
            , predicate: function (a) {
                return function (place) {
                    return a.id == place.id_google;
                }
            }
        };

        var find_fb = function (a) {
            return R.compose(
                findOtherFn(a, fb.others)
                , transformaID(a, fb.transformer)
                , trovaAttraversoNome(a)
            );
        };

        var find_goog = function (a) {
            return R.compose(
                findOtherFn(a, goog.others)
                , transformaID(a, goog.transformer)
                , trovaAttraversoNome(a)
            );
        };

        var find_open = function (a) {
            return R.compose(
                findOtherFn(a, open.others)
                , transformaID(a, open.transformer)
                , trovaAttraversoNome(a)
            );
        };
        var results_fb = R.map(mapFunction(fb.predicate, find_fb), fbPlaces);
        var results_goog = R.map(mapFunction(fb.predicate, find_goog), googlePlaces);
        var results_open = R.map(mapFunction(fb.predicate, find_open), opendata);
        var newMyPlaces = R.compose(
            R.uniq()
            , R.flatten
        )([results_fb, results_goog, results_open]);
        return newMyPlaces

    })
    .then(my_new_places=> {
        var fb_coll = connection.db.collection(Tables.FACEBOOK_PLACES),
            goog_coll = connection.db.collection(Tables.GOOGLE_PLACES),
            open_coll = connection.db.collection(Tables.OPENDATA_PLACES);
        var ps = my_new_places.map(place=> {

            var facebook;
            var google;
            var opendata;
            if (place.id_facebook) {
                facebook = fb_coll.findOne({id: place.id_facebook})
            } else {
                facebook = Promise.resolve({});
            }
            if (place.google) {
                google = goog_coll.findOne({place_id: place.id_google})
            } else {
                google = Promise.resolve({})
            }
            if (place.id_opendata) {
                opendata = open_coll.findOne({id: place.id_opendata})
            } else {
                opendata = Promise.resolve({})
            }
            return Promise.all([
                facebook
                , google
                , opendata
                , Promise.resolve(place)
            ]).then(([ facebook, google, opendata,place])=> {

                var googleImage = (R.view(R.lensPath(["photos"]), google) || [])[0];
                var otherPhotos = getOtherPhotos(google);
                if (googleImage) {
                    var image_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${googleImage.width}&maxheight=${googleImage.height}&photoreference=${googleImage.photo_reference}&key=${KEY}`.trim()
                }

                var geo = {
                    lng: R.view(R.lensPath(["geometry", "location", "lng"]), google)
                    || R.view(R.lensPath([ "location", "longitude"]), facebook)
                    || R.view(R.lensPath([ "longitudine"]), opendata)
                    , lat: R.view(R.lensPath([ "geometry", "location", "lat"]), google)
                    || R.view(R.lensPath([ "location", "latitude"]), facebook)
                    || R.view(R.lensPath([ "latitudine"]), opendata)
                };
                var description = R.view(R.lensPath(["description"]), facebook)
                    || R.view(R.lensPath(["description"]), google)
                    || R.view(R.lensPath(["description"]), opendata)
                    || "";

                var result = {
                    address: R.view(R.lensPath(["formatted_address"]), google)
                    || R.view(R.lensPath(["location", "street"]), facebook)
                    || R.view(R.lensPath(["indirizzo"]), opendata)
                    || R.view(R.lensPath(["full_address"]), opendata),
                    name: R.view(R.lensPath(["name"]), google)
                    || R.view(R.lensPath(["name"]), facebook)
                    || R.view(R.lensPath(["name"]), opendata),
                    openingHours: R.view(R.lensPath(["opening_hours", "weekday_text"]), google)
                    || hoursHelper.fbHours(R.view(R.lensPath(["hours"]), facebook)),
                    rating: R.view(R.lensPath(["rating"]), google),
                    telephone: R.view(R.lensPath(["international_phone_number"]), google)
                    || R.view(R.lensPath(["telefono"]), opendata),
                    image: R.view(R.lensPath(["cover", "source"]), facebook)
                    || image_url || "/static/img/placeholder-cover.jpg",
                    place_id: R.view(R.lensPath(["place_id"]), google),
                    geo,

                    id_facebook: place.id_facebook,
                    id_google: place.id_google,
                    id_opendata: place.id_opendata,
                    description,
                    bio: R.view(R.lensPath(["bio"]), facebook),
                    category_list: getCategories(facebook, google, opendata),
                    mission: R.view(R.lensPath(["mission"]), facebook),
                    general_info: R.view(R.lensPath(["general_info"]), facebook),
                    website: R.view(R.lensPath(["website"]), google)
                    || R.view(R.lensPath(["website"]), facebook)
                    || R.view(R.lensPath(["sito_web"]), opendata),
                    mapUrl: R.view(R.lensPath(["url"]), google),
                    email: (R.view(R.lensPath(["emails"]), facebook)||[])[0]
                    || R.view(R.lensPath(["email"]), google)
                    || R.view(R.lensPath(["email"]), opendata),

                    facebook_page: facebook && `https://www.facebook.com/${facebook.id}`
                    , otherPhotos
                };

                return result
            })
        });
        return Promise.all(ps);
    })
    .then(my_new_places=> {
        var myPlaces2Coll = connection.db.collection("my-places-2");
        fs.writeFileSync("my-new-places.json", JSON.stringify(my_new_places));
        return  myPlaces2Coll.insertMany(my_new_places);



    })
    .then(_=> {
        connection.db.close();
        console.log("done");
        process.exit(0);
    })
    .catch(_=> {
        connection.db.close();
        console.log("fail", _);
        process.exit(1);
    });