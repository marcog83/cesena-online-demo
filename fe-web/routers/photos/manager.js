let Connection = require("../../../dati-jobs/db/db-connection").Connection;
let Tables = require("../../../dati-jobs/db/tables");
let textFormatter = require("./text-formatter");
let R = require("ramda");
let ObjectId = require('mongodb').ObjectId;

function mapInstagramPhoto(photo) {

    return {
        image: photo.thumbnail_src
        , code: photo.code
        , description: textFormatter(photo.caption || "")
        , rating: R.view(R.lensPath(["likes", "count"]), photo) || 0
        , comments: R.view(R.lensPath(["comments", "count"]), photo) || 0
    }
}

exports.photosById = id=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.MY_PLACES_2))
        .then(coll=> {
            return coll.findOne({_id: ObjectId(id)});
        })
        .then(my_place=> {
            if (!my_place.id_facebook || !my_place.id_facebook.length)return {};
            var coll = connection.db.collection(Tables.INSTAGRAM_PHOTOS);
            return coll.find({id_facebook: {$in: my_place.id_facebook}})
                .sort({date: -1})
                .toArray()
        })
        .then(R.map(mapInstagramPhoto))

        .then(R.tap(_=>
            connection.db.close()
        ))

        .catch(R.tap(_=>connection.db.close()))
};
exports.photosHighlight = ({limit = 3})=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.INSTAGRAM_PHOTOS))
        .then(coll=> {
            return coll.find().sort({date: -1}).limit(limit).toArray()


        })
        .then(R.map(mapInstagramPhoto))
        .then(R.tap(_=>connection.db.close()))
        .catch(R.tap(_=>connection.db.close()))
};