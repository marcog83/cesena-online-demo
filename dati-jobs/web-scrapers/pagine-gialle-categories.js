var qs = require("qs");
var http = require("http");
var R = require("ramda");
var fs = require("fs");

var domain = "autocomplete.paginegialle.it";
var url = "/web/search_pgit.php?";

function httpCall(options, i) {
    return new Promise(function (resolve, reject) {
        setTimeout(_=> {
            var req = http.get(options, function (res) {
                var output = '';

                res.setEncoding('utf8');

                res.on('data', function (chunk) {
                    output += chunk;
                });

                res.on('end', function () {
                    var obj = JSON.parse(output);
                    console.log(i,'ok:', obj.results.length);
                    resolve(obj);
                });
            });

            req.on('error', function (e) {
                resolve({results:[]});
                console.log('ERROR: ' + e.message);
            });

        }, 1000 * i);

    })
}


var queries = "A,B,C,D,E,F,G,H,I,L,M,N,O,P,Q,R,S,T,U,V,Z".toLowerCase().split(",");

Promise.all(queries.map((q, i)=> {
    var params = {
        lang: 1,
        limit: 200
        , q
        , prov: "FC"
    };
    var options = {
        host: domain,
        path: url + qs.stringify(params)

    };
    return httpCall(options, i).then(response=>response.results);
})).then(R.flatten)
    .then(categories=> {
        fs.writeFileSync("pagine-gialle-categories.json", JSON.stringify(categories))
    });