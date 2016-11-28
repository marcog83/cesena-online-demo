const SeoUrl = require("../../fe-web/plugins/seo/seo-url");
const Connection = require("../db/db-connection").Connection;
const Tables = require("../db/tables");


var connection = new Connection();
connection.connect()
    .then(connection.collection.bind(connection, Tables.MY_PLACES_2))
    .then(coll=> {
        return coll.find({}).toArray()
    })
    .then(places=> {
        return Promise.all(places.map(place=> {
            return SeoUrl.save(SeoUrl.createURL(place.name), `/places/detail/${place._id.toString()}`)
        }))
    })
    .then(_=>connection.db.close())
    .catch(_=>connection.db.close());
var eventsConnection=new Connection();

eventsConnection.connect()
    .then(eventsConnection.collection.bind(eventsConnection, Tables.MY_EVENTS))
    .then(coll=> {
        return coll.find({}).toArray()
    })
    .then(places=> {
        return Promise.all(places.map(place=> {
            return SeoUrl.save(SeoUrl.createURL(place.name), `/events/${place._id.toString()}`)
        }))
    })
    .then(_=>eventsConnection.db.close())
    .catch(_=>eventsConnection.db.close());