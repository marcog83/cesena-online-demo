const Connection = require("./db/db-connection").Connection;
const Tables = require("./db/tables");
const R = require("ramda");
const fs = require("fs");

var connection = new Connection();
var QUERY_MATCHES = {
    $and: [
        {
            percent_name: {$gt: 0.55}
        }, {
            $or: [
                {percent_name: {$gt: 0.9}},
                {
                    distance: {$lt: 10}
                },
                {
                    percent_name: {$gt: 0.8},
                    distance: {$lt: 35}
                },
                {
                    percent_name: {$gt: 0.6},
                    percent_address_phonetic: 1,
                    distance: {$lt: 30}
                },
                {
                    percent_name: {$gt: 0.8},
                    percent_address_phonetic: 1,

                }

            ]
        }
    ]

};

connection.connect()
    .then(db=> {
        var coll = db.collection(Tables.FUZZY_MATCHES);
        return coll.find(QUERY_MATCHES).toArray()

    })
    .then((matches)=> {
        // var coll = connection.db.collection(Tables.FUZZY_MATCHES);
        var promises = matches.map(match=> {
            // var ID_MATCH_QUERY={
            //     id_p1: match.id_p1
            // };
            /**
             * {
                        $or: [
                            {id_p1: match.id_p1}
                        ]
                    }
             return coll.find({
                $and: [
                    ID_MATCH_QUERY
                    , QUERY_MATCHES]
            }).toArray()
             */
           return Promise.resolve(R.filter(item=>(item.id_p1==match.id_p1||item.id_p2==match.id_p1),matches)).then(response=> {
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
                    var isGoogle = id.match(/ch/gim);
                    var is_fb = !Number.isNaN(Number(id)); //&& R.is(Number,Number(id));
                    if (isGoogle) {
                        prev.id_google.push(id);
                    } else if (id.match(/piadi|cinema/gim)) {
                        prev.id_opendata.push(id);
                    } else if (is_fb) {
                        prev.id_facebook.push(id);
                    } else {
                        prev.id_imprese.push(id);
                    }
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
                var has_goog = match.id_google.filter(id=>nm.id_google.includes(id)).length;
                var has_open = match.id_opendata.filter(id=>nm.id_opendata.includes(id)).length;
                var has_impresa = match.id_imprese.filter(id=>nm.id_imprese.includes(id)).length;
                return has_fb || has_goog || has_open || has_impresa;
            })(uniq_matches);
            if (!found) {
                uniq_matches.push(match);
            }else {
                found.id_facebook=R.uniq(found.id_facebook.concat(match.id_facebook));
                found.id_google=R.uniq(found.id_google.concat(match.id_google));
                found.id_opendata=R.uniq(found.id_opendata.concat(match.id_opendata));
                found.id_imprese=R.uniq(found.id_imprese.concat(match.id_imprese));
            }
        }


        var fuzzyMatchColl = connection.db.collection(Tables.FUZZY_MATCHES_ONE_TO_MANY);
        return fuzzyMatchColl.drop().then(_=>{
            return fuzzyMatchColl.insertMany(uniq_matches);
        })

    })
    .then(_=> {
        connection.db.close();
        process.exit(0);
    }

)
    .catch(_=> {
        console.log(_);
        connection.db.close();
    });