function utcTimestamp(date) {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(),
        date.getUTCMilliseconds());
}
var Connection = require("./db/db-connection").Connection;
var Tables = require("./db/tables");

var connection = new Connection();
connection.connect()
    .then(connection.collection.bind(connection, Tables.MY_EVENTS))
    .then(coll=> {
        var coll2 = connection.db.collection(Tables.MY_EVENTS);
        return coll.find().toArray().then(events=> {
            var px = events.map(event=> {
                var start_time = utcTimestamp(new Date(event.start_time));
                var _set = {};
                _set.start_time = start_time;
                if (event.end_time) {
                    _set.end_time = utcTimestamp(new Date(event.end_time));
                }

                return coll2.findOneAndUpdate({id: event.id}, {$set: _set})
            });
            return Promise.all(px);
        })
    })
    .then(_=>connection.db.close())
    .catch(_=>connection.db.close());