const Connection = require("./db/db-connection").Connection;
const Tables = require("./db/tables");
const R = require("ramda");
const fs = require("fs");
const trovaByName = require('./find_place_by_text');
const scorePlaces = require('./score-places').scorePlaces;
const hoursHelper = require("../fe-web/opening_hours-helper");
const Categories=require("./categories");
var KEY = "AIzaSyA2awqLXHWlJuyI5mLY2du4NcuA7OYgpus";


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
        var openColl = db.collection(Tables.OPENDATA_PLACES);

        return Promise.all([
            fbColl.find().toArray().then(R.map(place=>({name: place.name, id: place.id})))
            , googColl.find().toArray().then(R.map(place=>({name: place.name, id: place.place_id})))

            , openColl.find().toArray().then(R.map(place=>({name: place.name, id: place.id})))
        ])
    })
    .then(([fbPlaces,googlePlaces,openPlaces])=> {
        var guess=R.curryN(2,(config,place)=>{
            return Object.keys(config).reduce((prev,key)=>{
                prev[key]=config[key](place);
                return prev;
            },{});
        });
        var fb_fn=R.compose(R.prop("id"),trovaByName(fbPlaces));
        var goog_fn=R.compose(R.prop("id"),trovaByName(googlePlaces));
        var open_fn=R.compose(R.prop("id"),trovaByName(openPlaces));
        //
        var goog_config={
            id_facebook: fb_fn
            , id_google: R.prop("id")
            , id_opendata:open_fn
        };
        var fb_config={
            id_facebook:  R.prop("id")
            , id_google:goog_fn
            , id_opendata:open_fn
        };
        var open_config={
            id_facebook:fb_fn
            , id_google:goog_fn
            , id_opendata: R.prop("id")
        };
        //
        var googleResults = R.map(guess(goog_config))(googlePlaces);
        var fbResults =  R.map(guess(fb_config))(fbPlaces);
        var openResults =R.map(guess(open_config))(openPlaces);
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
                var image_url = "";
                // var googleImage = (R.view(R.lensPath(["photos"]), google) || [])[0];
                // var otherPhotos = getOtherPhotos(google);
                // if (googleImage) {
                //     var image_url = "";//`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${googleImage.width}&maxheight=${googleImage.height}&photoreference=${googleImage.photo_reference}&key=${KEY}`.trim()
                // }
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