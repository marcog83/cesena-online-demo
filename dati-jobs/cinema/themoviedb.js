var qs = require("qs");
var https = require("https");
var api_key = "b95fe546ddd745c35ddec6aea63c9479";
var domain = "api.themoviedb.org";
var path = "/3/search/movie?";


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
                
                resolve(obj);
            });
        });

        req.on('error', function (e) {
            reject('ERROR: ' + e.message);
        });
    })
}

exports.getMovie = function (query) {
    var params = {
        api_key,
        language: "it-IT"

        ,primary_release_year: "2016"
        , query
    };
    var options = {
        host: domain,
        path: path + qs.stringify(params)

    };

    return httpCall(options).then(response=>response.results[0]);
};

