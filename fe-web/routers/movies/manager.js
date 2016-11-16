let Connection = require("../../../dati-jobs/db/db-connection").Connection;
let Tables = require("../../../dati-jobs/db/tables");
let R = require("ramda");

var getDetails = function (omdbColl, moviedbColl, my_places) {
    return movies=> {
        var _movies = movies
            .filter(movie=> {
                return movie.themoviedb || movie.omdbID
            })
            .map(movie=> {
                var omdb;
                if (movie.omdbID) {
                    omdb = omdbColl.findOne({imdbID: movie.omdbID});
                } else {
                    omdb = Promise.resolve({});
                }
                var moviedb;
                if (movie.themoviedb) {
                    moviedb = moviedbColl.findOne({id: movie.themoviedb});
                } else {
                    moviedb = Promise.resolve({})
                }
                var myPlace = my_places.findOne({id_facebook: movie.place.id_facebook});


                return Promise.all([
                    omdb, moviedb, myPlace
                ]).then(([omdb,moviedb,place])=> {
                    movie.cinemas = (movie.cinemas ||[]).map(cinema=> {
                        if (place)
                            cinema.place._id = place._id;
                        return cinema//Object.assign(cinema,{place})
                    });
                    return Object.assign(omdb, moviedb, movie);
                })
            });
        return Promise.all(_movies);
    };
};
exports.getMovies = ()=> {
    var connection = new Connection();
    return connection.connect()
        .then(db=> {
            var movieColl = db.collection(Tables.MOVIES_ORARI);
            var omdbColl = db.collection(Tables.OMDB_MOVIE);
            var my_places = db.collection(Tables.MY_PLACES_2);
            var moviedbColl = db.collection(Tables.THEMOVIEDB_MOVIE);
            return movieColl.find().toArray()
                .then(movies=> {
                    var groups = R.groupBy(movie=> {
                        return movie.themoviedb || movie.id;
                    }, movies);
                    var grouped = Object.keys(groups).map(key=> {
                        var group = groups[key];
                        var cinemas = group.map(m=> {
                            return {
                                place: m.place
                                , days_list: m.days_list
                            }
                        });
                        return Object.assign({cinemas}, group[0]);
                    });
                    return grouped

                })
                .then(getDetails(omdbColl, moviedbColl, my_places))
        })
        .then(R.tap(_=>connection.db.close()))
        .catch(R.tap(_=>connection.db.close()))
};

exports.geMoviesById = id_facebook=> {
    var connection = new Connection();
    return connection.connect()
        .then(db=> {
            var movieColl = db.collection(Tables.MOVIES_ORARI);
            var omdbColl = db.collection(Tables.OMDB_MOVIE);
            var moviedbColl = db.collection(Tables.THEMOVIEDB_MOVIE);
            var my_places = db.collection(Tables.MY_PLACES_2);
            return movieColl.find({"place.id_facebook": id_facebook}).toArray()
                .then(getDetails(omdbColl, moviedbColl,my_places))
                .then(R.tap(_=>connection.db.close()))
                .catch(R.tap(_=>connection.db.close()))
        })
};