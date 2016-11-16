const {eventiByPlace}=require("../../events/manager");
const {geMoviesById}=require("../../movies/manager");
const {photosById}=require("../../photos/manager");
const {findById}=require("../manager");
const Connection = require("../../../../dati-jobs/db/db-connection").Connection;
const Tables = require("../../../../dati-jobs/db/tables");
const R = require("ramda");
const intl = require('../../../intl/intl');
const enums = require("../../../common/enums");

function match(id) {
    var connection = new Connection();
    return connection.connect()
        .then(db=> {
            var placesColl = db.collection(Tables.MY_PLACES_2);
            return placesColl.find({category_list: "cinema"}, {_id: 1}).toArray()
                .then(cinemas=> {
                    cinemas = cinemas.map(cinema=>cinema._id.toString());
                    return cinemas.includes(id);
                })
                .then(R.tap(_=>connection.db.close()))
                .catch(R.tap(_=>connection.db.close()))
        });


}
module.exports = function render(req, res, next) {
    var id = req.params.id;
    return match(id).then(response=> {
        if (!response)next();
        else {
            return Promise.all([
                eventiByPlace({start_time: new Date(), limit: 3, id_place: id})
                , photosById(id)
                , findById(id)
            ]).then(([eventiEvidenza,photos,detail])=> {


                return geMoviesById(detail.id_facebook).then(movies=> {
                    var day_num = new Date().getDay();

                    var moviesOggi = movies
                        .filter(movie=> {
                            var day = movie.days_list[day_num];
                            return day.fascie && day.fascie.length;
                        });

//
                    var fascie = R.compose(
                        R.uniq,
                        R.flatten
                        , R.map(movie=> {
                            var day = movie.days_list[day_num];
                            return day.fascie
                        })
                    )(moviesOggi);
                    //
                    var moviesPerFascie = moviesOggi.map(movie=> {
                        var day = movie.days_list[day_num];
                        var fascie = day.fascie.join(",");
                        return Object.assign({fascie}, movie);
                    });

                    var week_movies = [];
                    var week_days = [];

                    for (var i = 0; i < 7; i++) {
                        week_days = movies
                            .map(movie=> {
                                var day = movie.days_list[i];
                                var date = new Date(day.day);
                                return {
                                    date
                                    , timestamp: date
                                }
                            });
                        week_movies = movies
                            .map(movie=> {
                                var day = movie.days_list[i];

                                var hasFascie = day.fascie && day.fascie.length;
                                if (hasFascie) {
                                    var timestamp = new Date(day.day).getTime();
                                    var currentFascie = day.fascie;
                                    return Object.assign({timestamp, currentFascie}, movie);
                                }
                            });

                    }


                    return {
                        eventiEvidenza, photos, detail, cinema: {
                            fascie,
                            moviesPerFascie
                            , week_days
                            , week_movies
                        }
                    }
                })


            })
                .then(({eventiEvidenza, photos, detail, cinema})=> {
                    res.render(enums.PLACE_MOVIE_DETAIL, Object.assign({
                        helpers: {
                            stylesheet: enums.getStylesheet(enums.PLACE_MOVIE_DETAIL)
                        }
                        , eventiEvidenza
                        , photos
                        , page_id: id
                        , data: {intl: intl}
                        , cinema

                    }, detail));
                })
                .catch(e=> {
                    console.error(e);
                    res.status(404)        // HTTP status 404: NotFound
                        .send(e.message);
                })
        }
    })

};