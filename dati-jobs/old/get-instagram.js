/**
 * Created by mgobbi on 04/04/2016.
 */
// Using require() in ES2015
// Using require() in ES5
  
var instagram = require('./instagram');
var fs = require("fs");


function getPlaces() {
    return new Promise(function (resolve, reject) {
        var places1 = JSON.parse(fs.readFileSync("places.json"));
        var places2= JSON.parse(fs.readFileSync("places-2.json"));
        resolve(places1.concat(places2))
    })
}


function getInstagram(place,i) {
    return instagram(place.id,i).then(function (photos) {

        return {
            id:place.id,
            instagram_photos:photos
        };
    }).catch(function (e) {
        console.log("getInstagram", e);
        return {
            id:place.id,
            instagram_photos:[]
        };
    });
}


// FACEBOOK

getPlaces() .then(function (places) {
    return Promise.all(places.map(getInstagram));
}).then(function (places) {

    return new Promise(function (resolve, reject) {
        fs.writeFile("instagram.json", JSON.stringify(places), function (err) {
            if (err) {
                reject(err);
                return console.log(err);
            }
            resolve(places);
        });
    })

}).then(function(e){
    console.log("OK");
    process.exit(0);
},function(e){
    console.log("KO",e);
    process.exit(1);
})

