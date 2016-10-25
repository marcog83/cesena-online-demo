var fs = require("fs-promise");
var R = require("ramda");
var Connection = require("../db/db-connection").Connection;
var Tables = require("../db/tables");
Promise.all([
    fs.readFile("alladin-movies.json").then(JSON.parse).then(movies=>movies.map(movie=>Object.assign({
        place: {
            cinema: "alladin",
            id_facebook: "172415072783776",
            id_google: "ChIJGTTbnB67LBMRuXPQl2R5tiY",
            id_opendata: "movie_1"
        }
    }, movie)))
    , fs.readFile("astra-movies.json").then(JSON.parse).then(movies=>movies.map(movie=>Object.assign({
        place: {
            cinema: "astra",
            id_facebook: "126324547429982",
            id_google: "ChIJXWimnbekLBMRWaKYdcbbNTQ",
            id_opendata: "movie_3"
        }
    }, movie)))
    , fs.readFile("1476748800000__eliseo-movies.json").then(JSON.parse).then(movies=>movies.map(movie=>Object.assign({
        place: {
            cinema: "eliseo",
            id_facebook: "126950057343635",
            id_google: "ChIJY843LMmkLBMRLhgczK8eEuA",
            id_opendata: "movie_5"
        }
    }, movie)))
    , fs.readFile("sanbiagio-movies.json").then(JSON.parse).then(movies=>movies.map(movie=>Object.assign({
        place: {
            cinema: "sanbiagio",
            id_facebook: "1409690455948545",
            id_google: "ChIJp9IKdMmkLBMR13R5akN-gBw",
            id_opendata: "movie_6"
        }
    }, movie)))
    , fs.readFile("victor-movies.json").then(JSON.parse).then(movies=>movies.map(movie=>Object.assign({
        place: {
            cinema: "victor",
            id_facebook: "401279759926657",
            id_google: "ChIJWY4nC5ejLBMRHgSA8nRvr2w",
            id_opendata: "movie_7"
        }
    }, movie)))
]).then(response=> {
    response = R.flatten(response);

    var connection = new Connection();
    return connection.connect()
        .then(db=> {
            var omdb = db.collection(Tables.OMDB_MOVIE);
            var themoviedb = db.collection(Tables.THEMOVIEDB_MOVIE);
            var promises1 = response.filter(movie=>movie.details)
                .map(movie=>movie.details)
                .map(themovie=> {
                    return themoviedb.findOneAndUpdate({id: themovie.id}, themovie, {upsert: true})
                        .then(_=>console.log("themoviedb: ", themovie.title))
                });
            var promises2 = response.filter(movie=>movie.omdb && movie.omdb.Response != "False")
                .map(movie=>movie.omdb )
                .map(omdb_movie=> {
                    return omdb.findOneAndUpdate({imdbID: omdb_movie.imdbID}, omdb_movie, {upsert: true})
                        .then(_=>console.log("omdb: ", omdb_movie.Title))
                });
            return Promise.all(promises1.concat(promises2))
                .then(_=>response);
        });

})
    .then(response=> {
        return response.map(movie=> {
            return {
                omdbID: (movie.omdb && movie.omdb.imdbID)|| null
                , themoviedb: (movie.details && movie.details.id)|| null
                , days_list: movie.days_list
                , detail_url: movie.detail
                , id: movie.id || movie.title
                , place: movie.place
            }
        })
    })
    .then(response=> {
        var connection = new Connection();
        return connection.connect()
            .then(connection.collection.bind(connection, Tables.MOVIES_ORARI))
            .then(coll=> {
                var promises = response.map(movie=> {
                    return coll.findOneAndUpdate({id: movie.id}, movie, {upsert: true})
                });
                return Promise.all(promises);
            })

    })
    .then(_=> {
        console.log("DONE");
        process.exit(0);
    })
    .catch(e=> {
        console.log("CATCH", e);
        process.exit(1);
    });