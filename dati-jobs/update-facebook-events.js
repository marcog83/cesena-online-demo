var Connection = require("./db/db-connection").Connection;
var Tables = require("./db/tables");
var FBHelpers = require("./fb/get-events");
var R = require('ramda');
const File=require("./files_name");


function getFacebookPlacesCollection() {
    var connection = new Connection();
    return connection.connect()
        .then(_=>Tables.FACEBOOK_PLACES)
        .then(connection.collection.bind(connection))
        .then(coll=> {
            return coll.find().toArray()
        })
        .then(R.tap(_=>connection.db.close()))
}

function getFacebookEvents({from_file=true}) {

    var promise;
    if (from_file) {
        promise = getFacebookPlacesCollection()
    } else {

        promise = Promise.reject("not implemented");
    }

    return promise.then(FBHelpers.getEvents)
        .then(items=> {
            var connection = new Connection();
            return connection.connect()
                .then(_=>Tables.MY_EVENTS)
                .then(connection.collection.bind(connection))
                .then(col=> Promise.all(items.map(item=>
                    col.findOneAndUpdate({id: item.id}, {$set:item}, {upsert: true}))
                ))
                .then(function (response) {
                    console.log(response.length);
                    connection.db.close();
                    process.exit(0);
                }).catch(e=> {
                    console.log("fb details inseert failed:", e);
                    connection.db.close();
                    process.exit(1);
                    return e;
                })
        })

}
getFacebookEvents({from_file:true});