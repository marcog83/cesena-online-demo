let fs = require("fs");
var qs = require("qs");
var R = require("ramda");
var https = require("https");
var stringSimilarity = require('string-similarity');
// var KEY = "AIzaSyCVP_DWJ4x_-HiwGbznZiwsLAphxYUOqZQ";
var KEY = "AIzaSyA2awqLXHWlJuyI5mLY2du4NcuA7OYgpus";
// var KEY = "AIzaSyCP7Leoxb6Lqp--LAex1hKfthYQ0yMKrwo";
var domain = "maps.googleapis.com";
var url_textsearch = "/maps/api/place/textsearch/json?";

var OVER_QUERY_LIMIT = false;
function httpCall(options, i) {
    return new Promise(function (resolve, reject) {
        setTimeout(_=> {

            var req = https.get(options, function (res) {
                var output = '';

                res.setEncoding('utf8');

                res.on('data', function (chunk) {
                    output += chunk;
                });

                res.on('end', function () {
                    var obj = JSON.parse(output);
                    if (obj.status == "OVER_QUERY_LIMIT") {
                        OVER_QUERY_LIMIT = true;
                    }
                    console.log(i, ": length", obj.results.length);
                    resolve(obj);
                });
            });

            req.on('error', function (e) {
                resolve({});
                console.log('ERROR: ' + e.message);
            });


        }, 1000 * i);
    })
}


var getPlace = (place, i)=> {


    var params = Object.assign({
        query: (place.name + " cesena")


        , key: KEY
    });

    var options = {
        host: domain,
        path: url_textsearch + qs.stringify(params)

    };

    return httpCall(options, i).then(google=> {
        return {
            google
            , place
        }
    });


};

//Promise.resolve(JSON.parse(fs.readFileSync("imprese.json")))
Promise.resolve(JSON.parse(fs.readFileSync("imprese-google-2.json")))
    //.then(R.map(place=>place.imprese))
    //.then(R.flatten)
    .then(places=> {
        var i = 0;
        var results = [];
        return places.reduce((prev, place)=> {

            return prev.then(result=> {
                results.push(result);
                var promise ;
                if(OVER_QUERY_LIMIT){
                    console.log("over_query_limit",place.place.name);
                    promise=  Promise.resolve(place);
                }else{
                    if(place.google.results){
                        console.log("ha risultati",place.place.name);
                        promise = Promise.resolve(place);
                    }else{
                        promise = getPlace(place.place, 1);
                    }

                }
                return promise;
            })


        }, Promise.resolve(null)).then(_=> {
            return results.filter(R.identity);
        });
        //return Promise.all(places.map(getPlace))
    })
    .then(results=> {
        fs.writeFileSync("imprese-google-2.json", JSON.stringify(results));
    });

