var themoviedb = require("./themoviedb");
var omdb = require("./omdb");
var fs = require("fs");
var R = require("ramda");
var generi = require("./genere");
exports.normalize = (filename)=> {

    return function (movies) {
        return Promise.resolve(movies)
            .then(response=> {


                return Promise.all(response.map((movie, i)=> {
                    return new Promise((resolve, reject)=> {
                        setTimeout(_=> {
                            themoviedb.getMovie(movie.title).then(details=> {
                                if (details) {
                                    details.generi = (details.genre_ids || []).map(id=> {
                                        return R.compose(R.prop("name")
                                            , R.find(genere=>parseInt(genere.id) == parseInt(id)))(generi)
                                    });
                                }

                                resolve(Object.assign({details}, movie))
                            })
                                .catch(reject)


                        }, 2000 * i);
                    })
                }))


            })
            .then(response=> {
                return Promise.all(response

                    .map((movie, i)=> {
                        if (!movie.details) {
                            return Promise.resolve(movie);
                        }

                        return new Promise((resolve, reject)=> {
                            setTimeout(_=> {
                                omdb.getMovie(movie.details.original_title)
                                    .then(detail=> {
                                        resolve(Object.assign({omdb: detail}, movie));
                                    })
                                    .catch(reject)
                            }, 1000 * i)
                        })
                    }))
            })
            .then(response=> {
                return response.map(movie=> {
                    movie.days_list.forEach(dlist=> {
                        var day=new Date(dlist.day);
                        var utc1 = Date.UTC(day.getFullYear(), day.getMonth(), day.getDate());
                        dlist.day = utc1;
                    });
                    return movie
                })
            })
            .then(response=> {
                fs.writeFileSync(filename, JSON.stringify(response));
                process.exit(0);
            }).catch(e=> {
                console.log(e);
                process.exit(1);
            })
    }

};