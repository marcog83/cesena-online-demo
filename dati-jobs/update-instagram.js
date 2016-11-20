var Connection = require("./db/db-connection").Connection;
var Tables = require("./db/tables");
var R = require('ramda');
const File = require("./files_name");
var fs = require("fs-promise");

var instagram = require('./instagram');
function writeJSONFile(filename) {
    return function ( places) {
        return fs.writeFile(filename, JSON.stringify(places)).then(_=>filename);
    }
}
function readJSONFile(filename) {
    return Promise.resolve(JSON.parse(fs.readFileSync(filename)));
}

function _getInstagram(place,i) {
    return instagram(place.id,i).then(function (photos) {

        return {
            id_facebook: place.id,
            instagram_photos: photos
        };
    }).catch(function (e) {
        console.log("getInstagram", e);
        return {
            id_facebook: place.id,
            instagram_photos: []
        };
    });
}

var getInstagram=places=> Promise.all(places.map(_getInstagram));

function updateInstagram() {
    return readJSONFile(File.INSTAGRAM_PHOTOS_JSON).then(instagram_photos=> {
        var connection = new Connection();
        return connection.connect()
            .then(connection.collection.bind(connection, Tables.INSTAGRAM_PHOTOS))
            .then(coll=> {
                return Promise.all(instagram_photos.map(photos=> {
                    return coll.findOneAndUpdate({id: photos.id}, {$set: photos}, {upsert: true})

                }));
            }).then(function (response) {
                connection.db.close();
                return response;
            }).catch(e=> {
                console.log("instagram inseert failed:", e);
                connection.db.close();
                return e;
            })
    })
}


var connection = new Connection();
connection.connect()
    .then(connection.collection.bind(connection, Tables.FACEBOOK_PLACES))
    .then(coll=>coll.find().toArray())
    .then(R.tap(_=>connection.db.close()))

    .then(getInstagram)
    .then(writeJSONFile(File.INSTAGRAM_PHOTOS_JSON))
    .then(updateInstagram)
    .catch(R.tap(_=>connection.db.close()));