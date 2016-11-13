const Connection = require("./db/db-connection").Connection;
const Tables = require("./db/tables");
const R = require("ramda");
const fs = require("fs");

const scorePlaces = require('./score-places').scorePlaces;
const hoursHelper = require("../fe-web/opening_hours-helper");
const Categories = require("./categories");
var KEY = "AIzaSyA2awqLXHWlJuyI5mLY2du4NcuA7OYgpus";


function getCategories(facebook, google, opendata) {
    var fb = (R.view(R.lensPath(["category_list"]), facebook) || []).map(cat=>cat.name);
    var goog = (R.view(R.lensPath(["types"]), google) || []);
    var open = (R.view(R.lensPath(["tags"]), opendata) || []);
    return (fb.concat(goog).concat(open));
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
        var openColl = db.collection(Tables.OPENDATA_PLACES);
        var fuzzyColl = db.collection(Tables.FUZZY_MATCHES_ONE_TO_MANY);

        return Promise.all([
            fbColl.find().toArray().then(R.map(place=>({name: place.name, id: place.id})))
            , googColl.find().toArray().then(R.map(place=>({name: place.name, id: place.place_id})))
            , openColl.find().toArray().then(R.map(place=>({name: place.name, id: place.id})))
            , fuzzyColl.find().toArray()
        ])
    })
    .then(([fbPlaces,googlePlaces,openPlaces,fuzzyPlaces])=> {


        //
        var googleResults = R.map(goog=> {
            var fuzzy = R.find(f=>f.id_google.includes(goog.id), fuzzyPlaces);
            if (fuzzy)return fuzzy;
            else return {
                id_google: [goog.id]
            };
        })(googlePlaces);
        var fbResults = R.map(place=> {
            var fuzzy = R.find(f=>f.id_facebook.includes(place.id), fuzzyPlaces);
            if (fuzzy)return fuzzy;
            else return {
                id_facebook: [place.id]
            };
        })(fbPlaces);
        var openResults = R.map(place=> {
            var fuzzy = R.find(f=>f.id_opendata.includes(place.id), fuzzyPlaces);
            if (fuzzy)return fuzzy;
            else return {
                id_opendata: [place.id]
            }
        })(openPlaces);
        //
        return R.uniq(fbResults.concat(googleResults).concat(openResults));
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
                facebook = fb_coll.find({id: {$in: place.id_facebook}}).toArray()
            } else {
                facebook = Promise.resolve([]);
            }
            if (place.id_google) {
                google = goog_coll.find({place_id: {$in: place.id_google}}).toArray();
            } else {
                google = Promise.resolve([])
            }
            if (place.id_opendata) {
                opendata = open_coll.find({id: {$in: place.id_opendata}}).toArray();
            } else {
                opendata = Promise.resolve([])
            }
            return Promise.all([
                facebook
                , google
                , opendata
                , Promise.resolve(place)
            ]).then(([ facebook, _google, _opendata,place])=> {

                var reduced_facebook = facebook.reduce((prev, curr)=> {
                    return Object.assign(prev, curr);
                }, {});
                var google = _google.reduce((prev, curr)=> {
                    return Object.assign(prev, curr);
                }, {});
                var opendata = _opendata.reduce((prev, curr)=> {
                    return Object.assign(prev, curr);
                }, {});

                var image_url = "";
                var googleImage = (R.view(R.lensPath(["photos"]), google) || [])[0];
                var otherPhotos = getOtherPhotos(google);
                if (googleImage) {
                    image_url = "";//`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${googleImage.width}&maxheight=${googleImage.height}&photoreference=${googleImage.photo_reference}&key=${KEY}`.trim()
                }
                var geo = {
                    lng: R.view(R.lensPath(["geometry", "location", "lng"]), google)
                    || R.view(R.lensPath(["location", "longitude"]), reduced_facebook)
                    || R.view(R.lensPath(["longitudine"]), opendata)
                    , lat: R.view(R.lensPath(["geometry", "location", "lat"]), google)
                    || R.view(R.lensPath(["location", "latitude"]), reduced_facebook)
                    || R.view(R.lensPath(["latitudine"]), opendata)
                };
                var description = R.view(R.lensPath(["description"]), reduced_facebook)
                    || R.view(R.lensPath(["description"]), google)
                    || R.view(R.lensPath(["description"]), opendata)
                    || "";


                //todo da eliminare quando ho trovato le categorie giuste
                var raw__categories = getCategories(reduced_facebook, google, opendata);

                var result = {
                    address: R.view(R.lensPath(["formatted_address"]), google)
                    || R.view(R.lensPath(["location", "street"]), reduced_facebook)
                    || R.view(R.lensPath(["full_address"]), opendata)
                    || R.view(R.lensPath(["indirizzo"]), opendata),
                    name: R.view(R.lensPath(["name"]), google)
                    || R.view(R.lensPath(["name"]), reduced_facebook)
                    || R.view(R.lensPath(["name"]), opendata),
                    openingHours: R.view(R.lensPath(["opening_hours", "weekday_text"]), google)
                    || hoursHelper.fbHours(R.view(R.lensPath(["hours"]), reduced_facebook)),
                    rating: R.view(R.lensPath(["rating"]), google),
                    telephone: R.view(R.lensPath(["international_phone_number"]), google)
                    || R.view(R.lensPath(["telefono"]), opendata),
                    image: R.view(R.lensPath(["cover", "source"]), reduced_facebook)
                    || image_url || "",
                    place_id: R.view(R.lensPath(["place_id"]), google),
                    geo,

                    id_facebook: place.id_facebook,
                    id_google: place.id_google,
                    id_opendata: place.id_opendata,
                    id_imprese: place.id_imprese,
                    description,
                    bio: R.view(R.lensPath(["bio"]), reduced_facebook),
                    raw__categories,
                    category_list: Categories.map(raw__categories),
                    mission: R.view(R.lensPath(["mission"]), reduced_facebook),
                    general_info: R.view(R.lensPath(["general_info"]), reduced_facebook),
                    website: R.view(R.lensPath(["website"]), google)
                    || R.view(R.lensPath(["website"]), reduced_facebook)
                    || R.view(R.lensPath(["sito_web"]), opendata),
                    mapUrl: R.view(R.lensPath(["url"]), google),
                    email: (R.view(R.lensPath(["emails"]), reduced_facebook) || [])[0]
                    || R.view(R.lensPath(["email"]), google)
                    || R.view(R.lensPath(["email"]), opendata),
                    facebook_page: reduced_facebook && reduced_facebook.id && `https://www.facebook.com/${reduced_facebook.id}`
                    , otherPhotos
                };

                return result
            })
        });
        return Promise.all(ps);
    })
    .then(my_new_places=> {
        var myPlaces2Coll = connection.db.collection(Tables.MY_PLACES_2);
        fs.writeFileSync("my-new-places.json", JSON.stringify(my_new_places));
        return myPlaces2Coll.insertMany(my_new_places);
    })
    .then(scorePlaces)
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