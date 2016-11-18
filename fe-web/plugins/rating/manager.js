const Connection = require("../../../dati-jobs/db/db-connection").Connection;
const Tables = require("../../../dati-jobs/db/tables");
const R = require("ramda");
exports.setRate = ({category, id,user,value})=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.RATINGS))
        .then(coll=> {
            var query = {user_id: user.id, category, id};
            return coll.findOneAndUpdate(query, {$set: Object.assign({}, query, {value})}, {upsert: true});
        })
        .then(R.tap(connection.db.close()))
        .catch(R.tap(connection.db.close()))
};
exports.getRate = (user, category, id)=> {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.RATINGS))
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