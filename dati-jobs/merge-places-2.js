const Connection = require("./db/db-connection").Connection;
const Tables = require("./db/tables");
const R = require("ramda");
const fs = require("fs");
const stringSimilarity = require('string-similarity');
const scorePlaces = require('./score-places').scorePlaces;
const hoursHelper = require("../fe-web/opening_hours-helper");
const Categories=require("./categories");
var KEY = "AIzaSyA2awqLXHWlJuyI5mLY2du4NcuA7OYgpus";

function remove_common(str){
    return str
        //.replace(/cesena/gi,"")
        .replace(/teatro/gi,"")
        .replace(/cinema|CineTeatro|Multisala/gi,"")
        .replace(/Ristorante/gi,"")

}
 


function getCategories(facebook, google, opendata) {
    var fb = (R.view(R.lensPath(["category_list"]), facebook) || []).map(cat=>cat.name);
    var goog = (R.view(R.lensPath(["types"]), google) || []);
    var open = (R.view(R.lensPath(["tags"]), opendata) || []);



    return(fb.concat(goog).concat(open));
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
        //var myColl = db.collection(Tables.MY_PLACES);
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
        var TRESHOLD=0.75;
        function trovaByName(name, places) {
            var place_found = R.find(place=> {

                    var percent=stringSimilarity.compareTwoStrings(remove_common(name)
                        ,remove_common(place.name));

                    //percent >= TRESHOLD && console.log(name," => ", place.name,percent);
                    return percent >= TRESHOLD;
                    /*
                    var percent = stringSimilarity.compareTwoStrings(name, place.name);
                    return percent > TRESHOLD;*/
                }, places) || {};
            return place_found;
        }
        var fbResults = fbPlaces.map(fb_place=> {
            var my_place = R.find(my=>my.id_facebook == fb_place.id, myPlaces);
            if (my_place) {
                return {
                    id_facebook: my_place.id_facebook
                    , id_google: my_place.id_google
                    , id_opendata: my_place.id_opendata
                }
            } else {
                return {
                    id_facebook: fb_place.id
                    , id_google: trovaByName(fb_place.name, googlePlaces).id
                    , id_opendata: trovaByName(fb_place.name, opendata).id
                }
            }
        });

        var googleResults = googlePlaces.map(goog_place=> {
            var my_place = R.find(my=>my.id_google == goog_place.id, myPlaces);
            if (my_place) {
                return {
                    id_facebook: my_place.id_facebook
                    , id_google: my_place.id_google
                    , id_opendata: my_place.id_opendata
                }
            } else {
                return {
                    id_facebook: trovaByName(goog_place.name, fbPlaces).id
                    , id_google: goog_place.id
                    , id_opendata: trovaByName(goog_place.name, opendata).id
                }
            }
        });
        var openResults = opendata.map(open_place=> {
            var my_place = R.find(my=>my.id_opendata == open_place.id, myPlaces);
            if (my_place) {
                return {
                    id_facebook: my_place.id_facebook
                    , id_google: my_place.id_google
                    , id_opendata: my_place.id_opendata
                }
            } else {
                return {

                    id_facebook: trovaByName(open_place.name, fbPlaces).id
                    , id_google: trovaByName(open_place.name, googlePlaces).id
                    , id_opendata: open_place.id
                }
            }
        });

        var newMyPlaces = R.uniq(fbResults.concat(googleResults).concat(openResults));
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
            if (place.id_google) {
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
                    var image_url = "";//`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${googleImage.width}&maxheight=${googleImage.height}&photoreference=${googleImage.photo_reference}&key=${KEY}`.trim()
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


                //todo da eliminare quando ho trovato le categorie giuste
                var raw__categories=getCategories(facebook, google, opendata);

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
                    || image_url || "",
                    place_id: R.view(R.lensPath(["place_id"]), google),
                    geo,

                    id_facebook: place.id_facebook,
                    id_google: place.id_google,
                    id_opendata: place.id_opendata,
                    description,
                    bio: R.view(R.lensPath(["bio"]), facebook),
                    raw__categories,
                    category_list:  Categories.map(raw__categories),
                    mission: R.view(R.lensPath(["mission"]), facebook),
                    general_info: R.view(R.lensPath(["general_info"]), facebook),
                    website: R.view(R.lensPath(["website"]), google)
                    || R.view(R.lensPath(["website"]), facebook)
                    || R.view(R.lensPath(["sito_web"]), opendata),
                    mapUrl: R.view(R.lensPath(["url"]), google),
                    email: (R.view(R.lensPath(["emails"]), facebook)||[])[0]
                    || R.view(R.lensPath(["email"]), google)
                    || R.view(R.lensPath(["email"]), opendata),

                    facebook_page: facebook && facebook.id && `https://www.facebook.com/${facebook.id}`
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
        return  myPlaces2Coll.insertMany(my_new_places);
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