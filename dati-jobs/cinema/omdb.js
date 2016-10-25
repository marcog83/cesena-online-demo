var qs = require("qs");
var https = require("https");
var api_key = "b95fe546ddd745c35ddec6aea63c9479";
var domain = "omdbapi.com";
var path = "/?";


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
        t: query
        , y: 2016
        , plot: "full"
        , r: "json"

    };
    var options = {
        host: domain,
        path: path + qs.stringify(params)

    };

    return httpCall(options);
};

