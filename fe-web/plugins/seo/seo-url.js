/**
 * Created by mgobbi on 28/11/2016.
 */
const getSlug = require("speakingurl");
const Connection = require("../../../dati-jobs/db/db-connection").Connection;
const Tables = require("../../../dati-jobs/db/tables");
const R = require("ramda");
exports.createURL = name=> {
    return getSlug(name, {
        lang: "it"
    });
};
exports.save = (collection,name, original_url)=> {

    return collection.findOneAndUpdate({name}, {$set: {name, original_url}}, {upsert: true})

};
var getURL = name=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.SEO_URLS))
        .then(coll=>coll.findOne({name}))
        .then(R.tap(_=>connection.db.close()))
        .catch(R.tap(_=>connection.db.close()))
};
exports.getURL = getURL;
exports.middleware = (req, res, next)=> {
    var name = req.params.id;
    return getURL(name).then(seoItem=> {
        if (seoItem) {
            req.url = seoItem.original_url;
        }
        next();

    });
};