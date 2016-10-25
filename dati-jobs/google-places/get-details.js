var qs = require("qs");
var https = require("https");

var url_details = "/maps/api/place/details/json?";
// var KEY = "AIzaSyA2awqLXHWlJuyI5mLY2du4NcuA7OYgpus";

  var KEY = "AIzaSyCVP_DWJ4x_-HiwGbznZiwsLAphxYUOqZQ";
var domain = "maps.googleapis.com";

function getDetail(options) {
    return new Promise(function (resolve, reject) {
        var req = https.get(options, function (res) {
            var output = '';

            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                output += chunk;
            });

            res.on('end', function () {
                var obj = JSON.parse(output);
                console.log(obj.status,obj.result && obj.result.name)
                resolve(obj);
            });
        });

        req.on('error', function (e) {
            reject('ERROR: ' + e.message);
        });
    })
}


exports.getDetails = function (places) {
    return Promise.all(places.map(function (place, i) {
        var paramsDetails = {
            key: KEY
            , placeid: place.id_google
        };
        var optionsDetails = {
            host: domain,
            path: url_details + qs.stringify(paramsDetails)
        };
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(getDetail(optionsDetails).then(function (detail) {
                    var name=detail && detail.result && detail.result.name;
                    console.log(i,name);
                    return detail.result
                }))
            }, 1500 * i)
        })
    }))
};