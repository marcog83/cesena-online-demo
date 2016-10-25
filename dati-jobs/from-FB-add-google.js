let fs = require("fs");
var qs = require("qs");
var https = require("https");
var stringSimilarity = require('string-similarity');
var KEY = "AIzaSyCVP_DWJ4x_-HiwGbznZiwsLAphxYUOqZQ";
var domain = "maps.googleapis.com";
var url_nearbysearch = "/maps/api/place/nearbysearch/json?";
var url_details = "/maps/api/place/details/json?";


 

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

Promise.resolve( JSON.parse(fs.readFileSync("places-test.json")))
    .then(jsonArray=> {
        return Promise.all(jsonArray.map(function (item, i) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    var params = {
                        location: `${item.location.latitude},${item.location.longitude}`
                        , radius: "30"
                        , name: item.name
                            .replace(/é|è/g,"e")
                            .replace(/ì/g,"i")
                            .replace(/à/g,"a")
                            .replace(/ò|ó/g,"o")
                            .replace(/ù/g,"u")
                            .replace(/'|\\|"|!/g,"")
                            .split(" ").join("|")

                        , key: KEY
                    };

                    var options = {
                        host: domain,
                        path: url_nearbysearch + qs.stringify(params, { encode: false })

                    };

                    getPlaces(options).then(function (response) {

                        resolve(Object.assign({
                            google: response.results
                        }, {fb:item}))

                    }).catch(e=>reject(e))

                }, i * 2000);
            })
        }))
    })
    /*.then(function (results) {
        console.log('onResult: ' + results);
        return new Promise(function (resolve, reject) {
            fs.writeFile("fb-and-google-places.json", JSON.stringify(results), function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve("DONE")

            });
        })
    })*/
    .then(_=>process.exit(0))
    .catch(console.log.bind(console));