var Flickr = require("flickrapi"),
    flickrOptions = {
        api_key: "bb99bc17eececcef1e34df9e7bc5e914",
        secret: "0d496cd58fb00d8a"
    };
Flickr.tokenOnly(flickrOptions, function (error, flickr) {
    flickr.photos.search({
        text: "cesena"
    }, function (err, result) {
        if (err) {
            throw new Error(err);
        }
        // do something with result
        console.log(result);
    });
});