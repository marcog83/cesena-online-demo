let Connection = require("../../../dati-jobs/db/db-connection").Connection;
let Tables = require("../../../dati-jobs/db/tables");
let SeoUrl = require("../../plugins/seo/seo-url");
let R = require("ramda");
var findOne = function (haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
    });
};
var getDetails = function (omdbColl, moviedbColl, my_places) {
    return movies=> {
        movies = movies || [];
        var _movies = movies
            .filter(movie=> {
                return movie.id_themoviedb || movie.id_imdb
            })
            .map(movie=> {
                var omdb;
                if (movie.id_imdb) {
                    omdb = omdbColl.findOne({imdbID: movie.id_imdb});
                } else {
                    omdb = Promise.resolve({});
                }
                var moviedb;
                if (movie.id_themoviedb) {
                    moviedb = moviedbColl.findOne({id: movie.id_themoviedb});
                } else {
                    moviedb = Promise.resolve({})
                }

                var cinemas = (movie.cinemas || []).map(cinema=> {
                    var place = R.find(place=>
                        R.intersection(place.id_opendata, cinema.id_opendata).length > 0
                        , my_places);
                    if (place) {
                        place.seo_url = `/${SeoUrl.createURL(place.name)}`;
                    }

                    return {
                        place
                        , days_list: cinema.days_list
                    };

                });

                return Promise.all([
                    omdb, moviedb, Promise.resolve(cinemas)
                ]).then(([omdb,moviedb,cinemas])=> {
                    var ratingCount = "N/A";
                    var rate = "N/A";
                    if (omdb && omdb.imdbVotes != "N/A") {
                        ratingCount = omdb.imdbVotes;
                        rate = omdb.imdbRating;
                    } else if (moviedb && moviedb.vote_count) {
                        ratingCount = moviedb.vote_count;
                        rate = moviedb.vote_average;
                    }

                    return Object.assign(omdb, moviedb, movie, {
                        cinemas
                        , ratingCount
                        , rate
                    });
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
                                return movie.id_themoviedb || movie.id;
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
                                    id_themoviedb: group[0].id_themoviedb,
                                    id_imdb: group[0].id_imdb
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

exports.geMoviesById = (id_opendata,start_time)=> {
    var connection = new Connection();
    return connection.connect()
        .then(db=> {
            var movieColl = db.collection(Tables.MOVIES_ORARI);
            var omdbColl = db.collection(Tables.OMDB_MOVIE);
            var moviedbColl = db.collection(Tables.THEMOVIEDB_MOVIE);
            var my_places = db.collection(Tables.MY_PLACES_2);
            return movieColl.find({
                "place.id_opendata": id_opendata,
                "days_list": {$elemMatch: {day: {$gte:start_time.getTime()}}}
            }).toArray()
                .then(getDetails(omdbColl, moviedbColl, my_places))
                .then(R.tap(_=>connection.db.close()))
                .catch(R.tap(_=>connection.db.close()))
        })
};