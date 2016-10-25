var qs = require("qs");
var https = require("https");
var fs = require("fs");
var KEY = "AIzaSyA2awqLXHWlJuyI5mLY2du4NcuA7OYgpus";
var domain = "maps.googleapis.com";
var url_radarsearch = "/maps/api/place/radarsearch/json?";
var url_details = "/maps/api/place/details/json?";//ChIJgeG5j86kLBMRxTs9VG4xwTk
var FOOD = [
    'bakery'
    , 'bar'
    , 'cafe'

    , 'restaurant'

];
var params = {
    location: "44.1571,12.265"
    , radius: "10000"
    , type: FOOD.join(",")
    , key: KEY
}


//?location=48.859294,2.347589&radius=5000&type=cafe&keyword=vegetarian&key=YOUR_API_KEY

var options = {
    host: domain,
    path: url_radarsearch + qs.stringify(params)
};

function getPlaces(options) {
    return new Promise(function (resolve, reject) {
        var req = https.get(options, function (res) {
            var output = '';
            console.log(options.host + ':' + res.statusCode);
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

getPlaces(options).then(function (response) {
    return Promise.all(response.results.map(function (place,i) {
        var paramsDetails = {
            key: KEY
            , placeid: place.place_id
        };
        var optionsDetails = {
            host: domain,
            path: url_details + qs.stringify(paramsDetails)
        };
        return new Promise(function(resolve){
            setTimeout(function(){
                resolve(getPlaces(optionsDetails).then(function (detail) {
                    return detail.result
                }))
            },200*i)
        })
    }))
}).then(onResult)
    .catch(console.log.bind(console, "BOOM"));

function onResult(results) {
    console.log('onResult: ' + results);
    fs.writeFile("google-places.json", JSON.stringify(results), function (err) {
        if (err) {
            throw err;
           
        }

    });
}