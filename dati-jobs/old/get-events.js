var fs = require("fs");
var Mark = require("markup-js");
var moment = require("moment");
Mark.pipes.moment = function (date, format) {
    return new Date(date).toLocaleString()//moment(new Date(date)).format(format);
};
fs.readFile("places.json", 'utf8', function (err, data) {

    var places = JSON.parse(data);

    var events = places
        .filter(function (e) {
            return e && e.events && e.events.data && e.events.data.length;
        })
        .reduce(function (prev, curr) {
            return prev.concat(curr.events.data.map(function(e){
                e.place={
                    name:curr.name,
                    street:curr.location.street
                };
                e.cover=e.cover || {
                    source:curr.cover?curr.cover.source:""
                };
                return e;
            }));
        }, [])
        .filter(function (e, i) {
            return i < 100;
        })

    var template = fs.readFileSync("client/partials/event-thumbnail.html", "utf-8");
    var resultHTML = Mark.up(template, {events: events});
    fs.writeFile("client/partials/events-list.html", resultHTML, function (err) {
        if (err) {
            console.log(err);
            process.exit(1);

        } else {
            console.log("ok");
            process.exit(0);
        }

    })
});
