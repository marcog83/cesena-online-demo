let fs = require("fs");
var qs = require("qs");
var https = require("https");
var stringSimilarity = require('string-similarity');
// var KEY = "AIzaSyCVP_DWJ4x_-HiwGbznZiwsLAphxYUOqZQ";
var KEY = "AIzaSyA2awqLXHWlJuyI5mLY2du4NcuA7OYgpus";
// var KEY = "AIzaSyCP7Leoxb6Lqp--LAex1hKfthYQ0yMKrwo";
var domain = "maps.googleapis.com";
var url_nearbysearch = "/maps/api/place/nearbysearch/json?";
var url_details = "/maps/api/place/details/json?";
var {getDetails} = require("./get-details");


function httpCall(options) {
    return new Promise(function (resolve, reject) {
        var req = https.get(options, function (res) {
            var output = '';

            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                output += chunk;
            });

            res.on('end', function () {
                var obj = JSON.parse(output);
                console.log(obj.status,": length",obj.results.length);
                resolve(obj);
            });
        });

        req.on('error', function (e) {
            reject('ERROR: ' + e.message);
        });
    })
}


exports.getDetails = getDetails;
exports.getPlace = (place, spec = {})=> {

    var params = Object.assign({
        location: `${place.location.latitude},${place.location.longitude}`
        , radius: "30"
        , name: place.name
            .replace(/é|è/g, "e")
            .replace(/ì/g, "i")
            .replace(/à/g, "a")
            .replace(/ò|ó/g, "o")
            .replace(/ù/g, "u")
            .replace(/'|\\|"|!/g, "")
            .split(" ").join("|")

        , key: KEY
    }, spec);

    var options = {
        host: domain,
        path: url_nearbysearch + qs.stringify(params, {encode: false})

    };

    return httpCall(options).then(response=>response.results);


}