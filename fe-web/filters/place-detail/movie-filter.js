const places = require('../../places');
const movies = require('../../movies');
const R=require("ramda");
const intl = {
    "locales": "en-US",
    "formats": {
        "date": {
            "short": {
                "day": "numeric",
                "month": "long",
                "year": "numeric"
            }
        }
    }
};
const CINEMA_IDS = [
    "57fc09b018150f08acef847a"//bogart
    , "58029e86d64257bb790b13f3"//alladin
    , "57fc09b018150f08acef847f"//alladin 2
    , "57fc09b018150f08acef8589"//sanbiagio
    , "57fc09b018150f08acef84ee"//eliseo
    , "5802a8d8d64257bb790b1593"//victor
    , "5802a8d8d64257bb790b1592"//astra

];
function render(id, res) {
    return Promise.all([
        places.eventiByPlace({start_time: new Date(), limit: 3, id_place: id})
        , places.photosById(id)
        , places.findById(id)
    ]).then(([eventiEvidenza,photos,detail])=> {


        return movies.geMoviesById(detail.id_facebook).then(movies=> {
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
                            var currentFascie=day.fascie;
                            return Object.assign({timestamp,currentFascie}, movie);
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
        .then(({eventiEvidenza,photos,detail,cinema})=> {
            res.render('place-cinema-detail', Object.assign({
                helpers: {
                    stylesheet: function () {
                        return "<link rel='stylesheet' href='/static/css/place-cinema-detail.css'/>"
                    }
                }
                , eventiEvidenza
                , photos
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
function match(id) {
    return new Promise(resolve=> {
        resolve(CINEMA_IDS.includes(id));
    });

}
module.exports = {
    render,
    match
};