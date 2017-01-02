const Connection = require("./db/db-connection").Connection;
const Tables = require("./db/tables");
const R = require("ramda");
const fs = require("fs");
const _ = require("lodash");

const scorePlaces = require('./score-places').scorePlaces;
const hoursHelper = require("../fe-web/opening_hours-helper");
const Categories = require("./categories");
var KEY = "AIzaSyA2awqLXHWlJuyI5mLY2du4NcuA7OYgpus";
const geolib = require('geolib');

function getCategories(facebook, google, opendata) {
    var fb = R.pathOr([], ["category_list"], facebook).map(cat=>cat.name.replace(/\//gim, "_"));
    var goog = R.pathOr([], ["types"], google);
    var open = R.pathOr([], ["tags"], opendata);
    return (fb.concat(goog).concat(open));
}
function getOtherPhotos(detail) {
    return R.pathOr([], ["photos"], detail).map(googleImage=> {
        var image_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${googleImage.width}&maxheight=${googleImage.height}&photoreference=${googleImage.photo_reference}&key=${KEY}`.trim();
        return {
            image: image_url
            , description: ""
            , rating: null
            , comments: null
        }
    })
}


function groupFBPlaces(fbColl, fbFuzzyColl) {

    return Promise.all([
        fbColl.find().toArray()
        , fbFuzzyColl.find().toArray()
    ]).then(([fbPlaces,fbFuzzy])=> {
        var map_places = R.map(place=>({name: place.name, id: place.id}));
        var filtered = fbFuzzy.map(place=> {
            var reduced = place.id_facebook.reduce((prev, curr)=> {
                return _.defaults(prev, R.find(f=>f.id == curr, fbPlaces))
            }, {id: place.id_facebook});
            return reduced;
        });
        var ids = R.flatten(fbFuzzy.map(p=>p.id_facebook));
        var new_fb_places = fbPlaces.filter(place=> {
            var has_fuzzy = ids.includes(place.id);
            return !has_fuzzy;
        }).map(p=> {
            p.id = [p.id];
            return p;
        });
        return map_places(new_fb_places.concat(filtered));
    });


}

var connection = new Connection();


connection.connect()
    .then(db=> {
        var fbColl = db.collection(Tables.FACEBOOK_PLACES);
        var fbFuzzyColl = db.collection(Tables.FUZZY_MATCHES_FB_ONE_TO_MANY);
        var googColl = db.collection(Tables.GOOGLE_PLACES);
        var openColl = db.collection(Tables.OPENDATA_PLACES);
        var fuzzyColl = db.collection(Tables.FUZZY_MATCHES_ONE_TO_MANY);

        return Promise.all([
            groupFBPlaces(fbColl, fbFuzzyColl)
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
            var fuzzy = R.find(f=>R.defaultTo([], R.intersection(f.id_facebook, place.id)).length, fuzzyPlaces);
            if (fuzzy)return fuzzy;
            else return {
                id_facebook: place.id
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

        var fb_coll = connection.db.collection(Tables.FACEBOOK_PLACES),
            goog_coll = connection.db.collection(Tables.GOOGLE_PLACES),

            open_coll = connection.db.collection(Tables.OPENDATA_PLACES);

        return Promise.all([
                Promise.resolve(R.uniq(fbResults.concat(googleResults).concat(openResults)))
                , fb_coll.find().toArray()
                , goog_coll.find().toArray()
                , open_coll.find().toArray()

            ]
        )

            ;
    })
    .then(([my_new_places,fbPlaces,googlePlaces,openPlaces])=> {

        var ps = R.map(place=> {

            var facebook = [];
            var google = [];
            var opendata = [];

            if (place.id_facebook) {
                //
               // facebook = R.filter(p=>place.id_facebook.includes(p.id), fbPlaces);
                facebook = R.filter(p=>R.defaultTo([], R.intersection(place.id_facebook, p.id)).length, fbPlaces);
                //fb_coll.find({id: {$in: place.id_facebook}}).toArray()
            }
            if (place.id_google) {
                google = R.filter(p=>place.id_google.includes(p.place_id), googlePlaces);//goog_coll.find({place_id: {$in: place.id_google}}).toArray();
            }
            if (place.id_opendata) {
                opendata = R.filter(p=>place.id_opendata.includes(p.id), openPlaces); //open_coll.find({id: {$in: place.id_opendata}}).toArray();
            }
            return Promise.all([
                Promise.resolve(facebook)
                , Promise.resolve(google)
                , Promise.resolve(opendata)
                , Promise.resolve(place)
            ]).then(([ facebook, _google, _opendata,place])=> {

                var reduced_facebook = R.reduce((prev, curr)=> {
                    return Object.assign(prev, curr);
                }, {}, facebook);
                var google = R.reduce((prev, curr)=> {
                    return Object.assign(prev, curr);
                }, {}, _google);
                var opendata = R.reduce((prev, curr)=> {
                    return Object.assign(prev, curr);
                }, {}, _opendata);

                var image_url = "";
                var googleImage = R.pathOr([], ["photos"], google)[0];
                var otherPhotos = getOtherPhotos(google);
                if (googleImage) {
                    image_url = "";//`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${googleImage.width}&maxheight=${googleImage.height}&photoreference=${googleImage.photo_reference}&key=${KEY}`.trim()
                }
                var geo = {
                    lng: R.path(["geometry", "location", "lng"], google)
                    || R.path(["location", "longitude"], reduced_facebook)
                    || R.path(["longitudine"], opendata)
                    , lat: R.path(["geometry", "location", "lat"], google)
                    || R.path(["location", "latitude"], reduced_facebook)
                    || R.path(["latitudine"], opendata)
                };
                var description = R.path(["description"], reduced_facebook)
                    || R.path(["description"], google)
                    || R.path(["description"], opendata)
                    || "";


                //todo da eliminare quando ho trovato le categorie giuste
                var raw__categories = getCategories(reduced_facebook, google, opendata);

                var result = {
                    address: R.path(["formatted_address"], google)
                    || R.path(["location", "street"], reduced_facebook)
                    || R.path(["full_address"], opendata)
                    || R.path(["indirizzo"], opendata),
                    name: R.path(["name"], google)
                    || R.path(["name"], reduced_facebook)
                    || R.path(["name"], opendata),
                    openingHours: R.path(["opening_hours", "weekday_text"], google)
                    || hoursHelper.fbHours(R.path(["hours"], reduced_facebook)),
                    rating: R.path(["rating"], google),
                    telephone: R.path(["international_phone_number"], google)
                    || R.path(['telefono'], opendata),
                    image: R.path(["cover", "source"], reduced_facebook)
                    || image_url || "",
                    place_id: R.path(['place_id'], google),
                    geo,

                    id_facebook: R.defaultTo([], place.id_facebook),
                    id_google: R.defaultTo([], place.id_google),
                    id_opendata: R.defaultTo([], place.id_opendata),
                    id_imprese: R.defaultTo([], place.id_imprese),
                    description,
                    bio: R.path(['bio'], reduced_facebook),
                    raw__categories,
                    category_list: Categories.map(raw__categories),
                    mission: R.path(['mission'], reduced_facebook),
                    general_info: R.path(['general_info'], reduced_facebook),
                    website: R.path(['website'], google)
                    || R.path(['website'], reduced_facebook)
                    || R.path(['sito_web'], opendata),
                    mapUrl: R.path(['url'], google),
                    email: (R.path(['emails'], reduced_facebook) || [])[0]
                    || R.path(['email'], google)
                    || R.path(['email'], opendata),
                    facebook_page: reduced_facebook && reduced_facebook.id && `https://www.facebook.com/${reduced_facebook.id}`
                    , otherPhotos
                    , permanently_closed: R.path(['permanently_closed'], google)
                };

                return result
            })
        }, my_new_places);
        return Promise.all(ps);
    })
    //
    .then(my_new_places=> {
        my_new_places = R.filter(place=> {
            return !place.permanently_closed
        }, my_new_places);
        var myPlaces2Coll = connection.db.collection(Tables.MY_PLACES_2);
        // fs.writeFileSync("my-new-places.json", JSON.stringify(my_new_places));
        return myPlaces2Coll.drop().then(_=>myPlaces2Coll.insertMany(my_new_places));
        // return Promise.all(my_new_places.map(match=> {
        //     return myPlaces2Coll.findOneAndUpdate({
        //         $or: [
        //             {id_facebook: match.id_facebook},
        //             {id_google: match.id_google},
        //             {id_opendata: match.id_opendata}
        //         ]
        //     }, {$set: match}, {upsert: true}).then(_=> {
        //         console.log("update")
        //     });
        // }));

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