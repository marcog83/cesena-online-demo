const {eventiByPlace}=require("../../events/manager");
const {geMoviesById}=require("../../movies/manager");
const {photosById}=require("../../photos/manager");
const {findById}=require("../manager");
const Connection = require("../../../../dati-jobs/db/db-connection").Connection;
const Tables = require("../../../../dati-jobs/db/tables");
const R = require("ramda");
const intl = require('../../../intl/intl');
const enums = require("../../../common/enums");
const Seo = require('../../../plugins/seo/seo-meta');
const SeoUrl = require('../../../plugins/seo/seo-url');
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
            var start_time = new Date();
            start_time.setHours(0, 0, 0, 0);

            return Promise.all([
                eventiByPlace({start_time, limit: 3, id_place: id})
                , photosById(id)
                , findById(id)
            ]).then(([eventiEvidenza,photos,detail])=> {

                //
                var seo = Seo.getSeoMeta({
                    title: "Cesena Online :: " + detail.name
                    , url: `/${SeoUrl.createURL(detail.name)}`
                    , image: detail.image
                    , description: detail.raw_description
                });
                //

                var photo_count = photos.length;
                var comment_count = 0;
                var events_count = eventiEvidenza.length;
                var start_time = new Date();
                start_time.setHours(0, 0, 0, 0);
                return geMoviesById(detail.id_opendata, start_time).then(movies=> {
                    var day_num = start_time.getDay();
                    movies = movies || [];
                    var moviesOggi = movies.filter(movie=> {
                        var day = movie.days_list[day_num];
                        return day && day.fascie && day.fascie.length;
                    });

//
                    var fascie = R.compose(
                        R.sort(function (a, b) {
                            var a1 = new Date();
                            var hma = a.split(":");
                            a1 = a1.setHours(hma[0], hma[1], 0, 0);
                            //
                            var b1 = new Date();
                            var hmb = b.split(":");
                            b1 = b1.setHours(hmb[0], hmb[1], 0, 0);
                            return a1 - b1;
                        })
                        , R.uniq,
                        R.flatten
                        , R.map(movie=> {
                            var day = movie.days_list[day_num];
                            return day.fascie
                        })
                    )
                    (moviesOggi);
                    //
                    var moviesPerFascie = moviesOggi.map(movie=> {
                        var day = movie.days_list[day_num];
                        var fascie = day.fascie.join(",");
                        return Object.assign({fascie}, movie);
                    });

                    var week_movies = [];
                    var week_days = [];

                    for (var i = 0; i < 7; i++) {
                        var movie = movies
                            .filter(movie=> {
                                return movie.days_list[i];
                            })[0];
                        if (movie) {
                            var day = movie.days_list[i];
                            if (!day.day) {
                                week_days[i] = week_movies[i] = undefined;
                            } else {
                                var date = new Date(day.day);
                                week_days[i] = {
                                    date
                                    , timestamp: date
                                };
                                var hasFascie = day && day.fascie && day.fascie.length;
                                if (hasFascie) {
                                    var timestamp = new Date(day.day).getTime();
                                    var currentFascie = day.fascie;
                                    week_movies[i] = Object.assign({timestamp, currentFascie}, movie);
                                } else {
                                    week_movies[i] = undefined;
                                }
                            }

                        } else {
                            week_days[i] = undefined;
                            week_movies[i] = undefined;
                        }


                    }
                    week_days = week_days.filter(_=>_);
                    week_movies = week_movies.filter(_=>_);

                    return {
                        seo,
                        comment_count,
                        photo_count,
                        events_count,
                        eventiEvidenza, photos, detail, cinema: {
                            fascie,
                            moviesPerFascie
                            , week_days
                            , week_movies
                        }
                    }
                })


            })
                .then(({
                    seo,
                    comment_count,
                    photo_count,
                    events_count, eventiEvidenza, photos, detail, cinema
                })=> {
                    res.render(enums.PLACE_MOVIE_DETAIL, Object.assign({
                        helpers: {
                            stylesheet: enums.getStylesheet(enums.PLACE_MOVIE_DETAIL)
                        },
                        seo,
                        comment_count,
                        photo_count,
                        events_count
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