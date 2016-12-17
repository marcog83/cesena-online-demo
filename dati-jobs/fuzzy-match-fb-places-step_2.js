var Connection = require("./db/db-connection").Connection;
var Tables = require("./db/tables");
const R = require("ramda");
var QUERY_MATCHES = {
    $or: [
        {percent_name: {$gt: 0.9}},
        {
            distance: {$lt: 1}
        },
        {
            percent_name: {$gt: 0.8},
            distance: {$lt: 30}
        },
        {
            percent_name: {$gt: 0.8},
            percent_address_phonetic: 1,
            distance: {$lt: 50}
        }


    ]

};
var connection = new Connection();
connection.connect()
    .then(connection.collection.bind(connection, Tables.FUZZY_MATCHES_FB))
    .then(coll=> {
        return coll.find(QUERY_MATCHES).toArray()
    })
    .then(matches=> {
        var promises = matches.map(match=> {

            return Promise.resolve(R.filter(item=>(item.id_p1 == match.id_p1 || item.id_p2 == match.id_p1), matches)).then(response=> {
                return {
                    id: match.id_p1.toString(),
                    name: match.name_p1,
                    response: R.compose(
                        R.sortBy(R.identity),
                        R.uniq,
                        R.flatten,
                        R.map(place=> {
                            return [place.id_p1.toString(), place.id_p2.toString()]
                        })
                    )(response)


                }
            })
        });
        return Promise.all(promises);
    })
    .then(matches=> {

        matches = R.groupBy(item=>item.id, matches);
        matches = Object.keys(matches).map((key)=> {
            var get_ids = R.compose(
                R.reduce((prev, id)=> {
                    prev.id_facebook.push(id);
                    return prev;
                }, {id_facebook: [], id_google: [], id_opendata: [], id_imprese: []}),
                R.sortBy(R.identity),
                R.uniq,
                R.flatten
                , R.map(R.prop("response"))
            );
            var ids = get_ids(matches[key]);
            return Object.assign({
                name: matches[key][0].name
            }, ids)
        });

        var uniq_matches = [];
        for (var i = 0; i < matches.length; i++) {
            var match = matches[i];

            var found = R.find(nm=> {
                var has_fb = match.id_facebook.filter(id=>nm.id_facebook.includes(id)).length;

                return has_fb;
            })(uniq_matches);
            if (!found) {
                uniq_matches.push(match);
            }else {
                found.id_facebook=R.uniq(found.id_facebook.concat(match.id_facebook));

            }
        }


        var fuzzyMatchColl = connection.db.collection(Tables.FUZZY_MATCHES_FB_ONE_TO_MANY);
        return fuzzyMatchColl.drop().then(_=>{
            return fuzzyMatchColl.insertMany(uniq_matches);
        })

    })
    .then(_=> {
        connection.db.close();

        console.log("DONE");
        process.exit(0);
    })
    .catch(_=> {
        console.log(_);

        connection.db.close();
        process.exit(1);
    });