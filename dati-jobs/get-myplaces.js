let fs = require("fs");

var _ = require('lodash');

Promise.resolve(JSON.parse(fs.readFileSync("places-test.json")))
    .then(fb_places=> {

        var filtered = JSON.parse(fs.readFileSync("fb-and-google-places-filtered.json"));

        return fb_places.map(p=> {
            var _f = _.find(filtered, i=>i.fb.id == p.id);
            var id_google = _f ? _f.google.place_id : null;
            return {
                name: p.name
                , location: {
                    lat: p.location.latitude
                    , lng: p.location.longitude
                }
                , id_facebook: p.id
                , id_google:id_google
                , id_opendata: null
            }
        })
    })
    .then(places=> {
        fs.writeFileSync("my-places.json", JSON.stringify(places));
    })
    .then(function (e) {
        console.log("OK");
        process.exit(0);
    }, function (e) {
        console.log("KO");
        process.exit(1);
    })