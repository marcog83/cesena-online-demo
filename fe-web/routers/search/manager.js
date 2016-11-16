let Connection = require("../../../dati-jobs/db/db-connection").Connection;
let Tables = require("../../../dati-jobs/db/tables");
let R = require("ramda");
exports.search = query=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.MY_PLACES_2))
        .then(coll=> {
            var regex = new RegExp(query, "gi");
            return Promise.all([
                coll.find({name: regex}, {name: 1, _id: 1}).sort({score:-1}).limit(3).toArray()
                , coll.find({category_list: regex}, {category_list: 1}).sort({score:-1}).limit(3).toArray()
                    .then(R.compose(R.map(cat=> {
                        return {
                            name: cat
                            , query: cat
                        }
                    }), R.uniq,R.filter(cat=>cat.match(regex)), R.flatten, R.map(R.prop("category_list"))))

            ])
        })
        .then(([places,categories])=> {
            return {
                body: {
                    places
                    , categories
                }
            }
        })
        .then(R.tap(_=>connection.db.close()))
        .catch(R.tap(_=>connection.db.close()))
};