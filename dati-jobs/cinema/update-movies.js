var fs = require("fs");
var R = require("ramda");
var Connection = require("../db/db-connection").Connection;
var Tables = require("../db/tables");


function getmovies(url,query){
    var movies=JSON.parse(fs.readFileSync(url));
    var connection=new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection,Tables.MY_PLACES_2))
        .then(coll=>{
            return coll.findOne(query)
                .then(place=>{
                    return R.map(movie=>{
                        return Object.assign({place},movie);
                    },movies);
                })
        })
        .then(R.tap(_=>connection.db.close()))
        .catch(R.tap(_=>connection.db.close()))
}


Promise.all([
    getmovies("alladin-movies.json",{id_opendata:"cinema_1"}),
    getmovies("astra-movies.json",{id_opendata:"cinema_3"}),
    getmovies("sanbiagio-movies.json",{id_opendata:"cinema_6"}),
    getmovies("victor-movies.json",{id_opendata:"cinema_7"})


    // , fs.readFile("1476748800000__eliseo-movies.json").then(JSON.parse).then(movies=>movies.map(movie=>Object.assign({
    //     place: {
    //         cinema: "eliseo",
    //         id_facebook: "126950057343635",
    //         id_google: "ChIJY843LMmkLBMRLhgczK8eEuA",
    //         id_opendata: "movie_5"
    //     }
    // }, movie)))


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
                    return themoviedb.findOneAndUpdate({id: themovie.id}, {$set:themovie}, {upsert: true})
                        .then(_=>console.log("themoviedb: ", themovie.title))
                });
            var promises2 = response.filter(movie=>movie.omdb && movie.omdb.Response != "False")
                .map(movie=>movie.omdb )
                .map(omdb_movie=> {
                    return omdb.findOneAndUpdate({imdbID: omdb_movie.imdbID}, {$set:omdb_movie}, {upsert: true})
                        .then(_=>console.log("omdb: ", omdb_movie.Title))
                });
            return Promise.all(promises1.concat(promises2))
                .then(_=>response);
        }).catch(R.tap(_=>connection.db.close()))
        .then(R.tap(_=>connection.db.close()))

})
    .then(response=> {
        return response.map(movie=> {
            return {
                id_imdb: (movie.omdb && movie.omdb.imdbID)|| null
                , id_themoviedb: (movie.details && movie.details.id)|| null
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
                    return coll.findOneAndUpdate({id: movie.id}, {$set:movie}, {upsert: true})
                });
                return Promise.all(promises);
            })
            .catch(R.tap(_=>connection.db.close()))
            .then(R.tap(_=>connection.db.close()))

    })
    .then(_=> {
        console.log("DONE");
        process.exit(0);
    })
    .catch(e=> {
        console.log("CATCH", e);
        process.exit(1);
    });