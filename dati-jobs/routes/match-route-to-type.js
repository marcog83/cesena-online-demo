var Connection = require("../db/db-connection").Connection;
var Tables = require("../db/tables");

var connection = new Connection();
var cRoutes = connection.connect()
    .then(_=>Tables.RUNTASTIC_ROUTES)
    .then(connection.findAll.bind(connection));

var cTypes = connection.defer.promise
    .then(_=>Tables.RUNTASTIC_ROUTE_TYPES)
    .then(connection.findAll.bind(connection));


Promise.all([cRoutes, cTypes])
    .then(([routes, types])=> {
        console.log("OK", routes, types);

        return connection.collection(Tables.RUNTASTIC_ROUTES)
            .then(coll=> {
                var promises = routes.map(route=> {
                    route.sport_type_id = types.filter(type=>type.key == route.sport_type_id)
                        .map(type=>type._id)[0];
                    return coll.save(route, {w: 1}).then(resp=> {
                        console.log("OK", resp)
                    })
                });
                return Promise.all(promises)
            })
    })
    .then(response=> {
        console.log("DONE", response);
    })
    .catch(console.log.bind(console));


