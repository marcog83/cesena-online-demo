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


//
//function trovaAttraversoNome_OK(place, places) {
//    var placeFound = R.find(mp=> {
//        return stringSimilarity.compareTwoStrings(mp.name, place.name) >= .5;
//    }, places);
//    if (placeFound) {
//        return placeFound;
//    } else {
//        return null;
//    }
//}
var trovaAttraversoNome = R.curryN(2, function (place, places) {
    var placeFound = R.find(mp=> {
        return stringSimilarity.compareTwoStrings(mp.name, place.name) >= .5;
    }, places);
    return placeFound ? placeFound.id : null
})


var transformaID = (function (a,transformer) {
    return function (b) {
        if (b) {
            return transformer(a, b)
        }
        return b
    }
});


var findOtherFn = function (a,callback) {
    return function () {
        return callback(a);
    }
};


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
        findOtherFn(a,fb.others)
        , transformaID(a,fb.transformer)
        , trovaAttraversoNome(a)
    );
};

var find_goog = function (a) {
    return R.compose(
        findOtherFn(a,goog.others)
        , transformaID(a,goog.transformer)
        , trovaAttraversoNome(a)
    );
};

var find_open = function (a) {
    return R.compose(
        findOtherFn(a,open.others)
        , transformaID(a,open.transformer)
        , trovaAttraversoNome(a)
    );
}

var results_fb = R.map(mapFunction(fb.predicate, find_fb), fbPlaces);
var results_goog = R.map(mapFunction(fb.predicate, find_goog), googlePlaces);
var results_open = R.map(mapFunction(fb.predicate, find_open), opendata);


console.log("---- FB\n", results_fb);

console.log("---- GOOGLE\n", results_goog);
console.log("---- OPEN\n", results_open);


myPlaces = R.compose(
    R.uniq()
    , R.flatten
)([results_fb, results_goog, results_open]);

console.log("---- MY PLACES\n", myPlaces);

//
//var results_fb = fbPlaces.map((fbp)=> {
//    var place = R.find(mp=>mp.id_facebook == fbp.id, myPlaces);
//
//    if (place) {
//        return place;
//    } else {
//        place = trovaAttraversoNome(fbp, myPlaces);
//
//        if (place) {
//            place.id_facebook = fbp.id;
//        } else {
//            place = {
//                id_facebook: fbp.id
//                , id_google: (trovaAttraversoNome(fbp, googlePlaces) || {}).id
//                , id_opendata: (trovaAttraversoNome(fbp, opendata) || {}).id
//            }
//        }
//    }
//    return place;
//});
//
//var results_goog = googlePlaces.map((place)=> {
//    var placeFound = R.find(mp=>mp.id_google == place.id, myPlaces);
//
//    if (placeFound) {
//        return placeFound;
//    } else {
//        placeFound = trovaAttraversoNome(place, myPlaces);
//        if (placeFound) {
//            placeFound.id_google = place.id;
//        } else {
//            placeFound = {
//                id_facebook: (trovaAttraversoNome(place, fbPlaces) || {}).id
//                , id_google: place.id
//                , id_opendata: (trovaAttraversoNome(place, opendata) || {}).id
//            }
//        }
//    }
//    return placeFound;
//});
//
//
//var results_open = opendata.map((place)=> {
//    var placeFound = R.find(mp=>mp.id_opendata == place.id, myPlaces);
//
//    if (placeFound) {
//        return placeFound;
//    } else {
//        placeFound = trovaAttraversoNome(place, myPlaces);
//        if (placeFound) {
//            placeFound.id_opendata = place.id;
//        } else {
//            placeFound = {
//                id_facebook: (trovaAttraversoNome(place, fbPlaces) || {}).id
//                , id_opendata: place.id
//                , id_google: (trovaAttraversoNome(place, googlePlaces) || {}).id
//            }
//        }
//    }
//    return placeFound;
//});



