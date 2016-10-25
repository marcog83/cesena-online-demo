var stringSimilarity = require('string-similarity');

exports.findSimilarityGoogleFB = function (places) {


    return places.map(place=> {
        place.google = place.google.map(g_place=> {
            g_place.__percent = stringSimilarity.compareTwoStrings(g_place.name, place.fb.name);
            // var comparation = (g_place.name + "," + place.fb.name + "," + percent);
            // var comparation = `"${g_place.name.replace(/"|;/g, "")}";"${place.fb.name.replace(/"|;/g, "")}";"${percent}";`;
            // console.log(comparation);
            //  percent;
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
    //return newPlaces;
};

     