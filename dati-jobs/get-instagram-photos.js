var Connection = require("./db/db-connection").Connection;
var Tables = require("./db/tables");
var R = require('ramda');
const File = require("./files_name");
var fs = require("fs-promise");

var instagram = require('./instagram');
function writeJSONFile(filename) {
    return function (places) {
        return fs.writeFile(filename, JSON.stringify(places)).then(_=>filename);
    }
}
function readJSONFile(filename) {
    return Promise.resolve(JSON.parse(fs.readFileSync(filename)));
}

function _getInstagram(place, i) {
    return instagram({place_id: place.id, i}).then(function (photos) {
        console.log(i, ":", place.name, "=>", photos.length);
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

var getInstagram = places=> Promise.all(places.map(_getInstagram));

function updateInstagram() {
    return readJSONFile(File.INSTAGRAM_PHOTOS_JSON).then(instagram_photos=> {

        var connection = new Connection();
        return connection.connect()
            .then(connection.collection.bind(connection, Tables.INSTAGRAM_PHOTOS))
            .then(coll=> {
                var promises = R.compose(
                        R.map(photo=> {
                            return coll.findOneAndUpdate({id: photo.id}, {$set: photo}, {upsert: true})
                        })
                        , R.flatten
                        , R.map(item=> {
                            return item.instagram_photos.map(photo=> {
                                return Object.assign({id_facebook: item.id_facebook}, photo)
                            })
                        })
                    )(instagram_photos);

                return Promise.all(promises);
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
updateInstagram();

// var connection = new Connection();
// connection.connect()
//     .then(connection.collection.bind(connection, Tables.FACEBOOK_PLACES))
//     .then(coll=>coll.find().toArray())
//     .then(R.tap(_=>connection.db.close()))
//
//     .then(getInstagram)
//     .then(writeJSONFile(File.INSTAGRAM_PHOTOS_JSON))
//     .then(updateInstagram)
//     .then(R.tap(_=>connection.db.close()))
//     .catch(R.tap(_=>connection.db.close()));

