let Connection = require("../../../dati-jobs/db/db-connection").Connection;
let Tables = require("../../../dati-jobs/db/tables");
let SeoUrl = require("../../plugins/seo/seo-url");
const normalizeUrl = require('normalize-url');
let R = require("ramda");
let getPlaceholder = require("./get-placeholder");
let ObjectId = require('mongodb').ObjectId;

let urlRegex = require("url-regex");


function eliminaEccezioni(id) {
    var noop = _=>R.identity;
    var eccezioni = {
        benessere: noop
        , viaggiare: noop
        , food: noop
        , locali: function (place) {
            return R.find((cate)=> {
                return !cate.match(/Public|Gastropub|Publisher/gmi)
            }, place.category_list)
        }
        , tech: noop
        , music: noop
        , health: noop
        , architecture: noop
        , arts: noop
        , "movie-theater": noop
        , sports: noop
    };
    var fn = eccezioni[id] || noop;
    return R.filter(fn)
}


function mapDetailPlace(my_place) {

    var website=(my_place.website|| "").match(/not-applicable/gim)?"":my_place.website;

    return Object.assign({}, my_place, {
        raw_description: my_place.description || ""
        , description: formatDescription(my_place.description || "")
        , image: my_place.image || getPlaceholder(my_place)
        , seo_url: `/${SeoUrl.createURL(my_place.name)}`
        ,website:website && normalizeUrl(website, {normalizeProtocol: true,stripWWW: false})

    })
}
exports.findByChannel = function (id, options = {limit: 12, filters: []}) {
    var connection = new Connection();

    return connection.connect()
        .then(db=> {
            var my_places = db.collection(Tables.MY_PLACES_2);
            var query = {};
            if (id) {
                var _regexp = new RegExp(id, "gi");
                query = {category_list: {$all: options.filters.concat([_regexp])}};
            }


            return my_places.find(query)
                .sort({score: -1})
                .limit(options.limit)
                .toArray()
                .then(eliminaEccezioni(id))
        })
        .then(R.tap(_=>connection.db.close()))
        .then(R.map(mapDetailPlace))
        .catch(R.tap(_=>connection.db.close()))
};


exports.findById = id=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.MY_PLACES_2))
        .then(coll=> {
            return coll.findOne({_id: ObjectId(id)});
        })
        .then(R.tap(_=>connection.db.close()))
        .then(mapDetailPlace)
        .catch(R.tap(_=>connection.db.close()))

};
exports.findMyPlaceByFacebookId = id_facebook=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.MY_PLACES_2))
        .then(coll=> {
            return coll.findOne({id_facebook});
        })
        .then(R.tap(_=>connection.db.close()))
        .then(mapDetailPlace)
        .catch(R.tap(_=>connection.db.close()))

};


function formatDescription(description = "") {
    return (description.match(urlRegex()) || []).reduce((prev, curr)=> {
        var link = normalizeUrl(curr, {normalizeProtocol: true,stripWWW: false});
        return prev.replace(curr, `<a href='${link}'>${curr}</a>`)
    }, description.replace(/\n/gi, "<br>"));
}

