var fs = require("fs");
var Mark = require("markup-js");
var moment = require("moment");


fs.readFile("places.json", 'utf8', function (err, data) {
    var instagram = fs.readFileSync("instagram.json");
    instagram = JSON.parse(instagram);
    var places = JSON.parse(data);
    var template = fs.readFileSync("client/tpl/detail-tpl.html", "utf-8");
    places.forEach(function (i, index) {
        var photos = (instagram.filter(function (photo) {
                return photo.id == i.id;
            })[0]) || [{instagram_photos: []}];
        var obj = {
            name: i.name,
            abstract: i.about || (i.category_list && i.category_list[0].name) || "unknown" ,
            description:  i.description|| " ",
            cover: i.cover ? i.cover.source : "gfx/event-1.jpg",
            posts: (i.posts && i.posts.data) ? i.posts.data.length : 0,
            photos: (i.photos && i.photos.data) ? i.photos.data.length : 0,
            events: (i.events && i.events.data) ? i.events.data.length : 0,
            street: i.location.street,
            zip: i.location.zip,
            right: (index % 2 === 0) ? "" : "",
            instagram_photos: photos.instagram_photos || []

        };
        var has_info = obj.photos || obj.events || obj.posts;
        obj.has_info = has_info;
        var resultHTML = Mark.up(template, obj);
        var name = i.id;
        fs.writeFileSync("client/tpl/detail/" + name + ".html", resultHTML);

    });
    /*.filter(function (e, i) {
     return i<200;
     })*/


});
