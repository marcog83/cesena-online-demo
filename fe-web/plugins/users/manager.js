const Connection = require("../../../dati-jobs/db/db-connection").Connection;
const Tables = require("../../../dati-jobs/db/tables");
const R = require("ramda");
// var bcrypt = require('bcrypt-nodejs');
exports.postUser = (req,res)=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.OAuthUsers))
        .then(coll=> {
            var user = {
                username: req.body.username,
                password: req.body.password
            };
            return coll.insertOne(user);
        })
        .then(R.tap(connection.db.close()))
        .catch(R.tap(connection.db.close()))
};
exports.getUser = (req, res)=> {

    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.OAuthUsers))
        .then(coll=> {
            var query = {};
            if (user.id) {
                query = {user_id: user.id, category, id};
            } else {
                query = {category, id};
            }
            return coll.find(query).toArray().then(response=> {
                var sum = response.reduce((prev, curr)=> {
                    return prev + curr;
                }, 0);
                return {
                    result: sum / response.length
                }
            });
        })
        .then(R.tap(connection.db.close()))
        .catch(R.tap(connection.db.close()))
};