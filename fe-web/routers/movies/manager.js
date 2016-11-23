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

                var cinemas = movie.cinemas.map(cinema=> {
                    var place=R.find(place=>
                        place.id_facebook.includes(cinema.place.id_facebook) ,my_places);
                    return {
                        place
                        ,days_list: cinema.days_list
                    };

                });

                return Promise.all([
                    omdb, moviedb, Promise.resolve(cinemas)
                ]).then(([omdb,moviedb,cinemas])=> {


                    return Object.assign(omdb, moviedb, movie,{cinemas});
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
            var my_placesColl = db.collection(Tables.MY_PLACES_2);
            var moviedbColl = db.collection(Tables.THEMOVIEDB_MOVIE);

            return my_placesColl.find({category_list: /cinema/gim}).toArray()
                .then(my_places=> {
                    return movieColl.find({}).toArray()
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
                                return Object.assign({cinemas}, {
                                    themoviedb: group[0].themoviedb,
                                    omdbID: group[0].omdbID
                                });
                            });
                            return grouped

                        })
                        .then(getDetails(omdbColl, moviedbColl, my_places))
                });


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
                .then(getDetails(omdbColl, moviedbColl, my_places))
                .then(R.tap(_=>connection.db.close()))
                .catch(R.tap(_=>connection.db.close()))
        })
};