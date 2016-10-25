var fs = require("fs");
var Mark = require("markup-js");
var moment = require("moment");

fs.readFile("places.json", 'utf8', function (err, data) {

    var places = JSON.parse(data);

    places = places.map(function (i,index) {
            var obj = {
                id: i.id,
                name: i.name,
                cover: i.cover ? i.cover.source : "gfx/event-1.jpg",
                posts: (i.posts && i.posts.data) ? i.posts.data.length : 0,
                photos: (i.photos && i.photos.data) ? i.photos.data.length : 0,
                events: (i.events && i.events.data) ? i.events.data.length : 0,
                street: i.location.street,
                zip: i.location.zip,
                right:(index%2===0)?"":"right"

            };
            var has_info = obj.photos || obj.events || obj.posts;
            obj.has_info = has_info;
            return obj
        })
        /*.filter(function (e, i) {
            return i<200;
        })*/

    var template = fs.readFileSync("client/partials/place-thumbnail.html", "utf-8");
    var resultHTML = Mark.up(template, {places: places});
    fs.writeFile("client/partials/places-list.html", resultHTML, function (err) {
        if (err) {
            console.log(err);
            process.exit(1);

        } else {
            console.log("ok");
            process.exit(0);
        }

    })
});
