var R = require("ramda");
var stringSimilarity = require('string-similarity');
let fbPlaces = [{
    id: 1,
    name: "10"
}, {
    id: 2,
    name: "20"
}, {
    id: 3,
    name: "40"
}];


let googlePlaces = [{
    id: 3,
    name: "10"
}, {
    id: 6,
    name: "20"
}, {
    id: 4,
    name: "30"
}, {
    id: 5,
    name: "60"
}];


let opendata = [{
    id: 1,
    name: "30"
}, {
    id: 2,
    name: "40"
}, {
    id: 200,
    name: "60"
}];


let myPlaces = [{
    name: "60"
    , id_google: ""
    , id_facebook: ""
    , id_opendata: ""
}];

function trovaByName(name, places) {
    var place_found = R.find(place=> {
            var percent = stringSimilarity.compareTwoStrings(name, place.name);
            return percent > 0.66;
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

var results = R.uniq(fbResults.concat(googleResults).concat(openResults));
console.log(results)