var fs = require("fs");
var qs = require("qs");
var Xray = require('x-ray');
var x = Xray();
var normalize = require("./normalize-movies");
var base = "#main   tr:nth-child(2) > td > table   tr > td > table   tr > td:nth-child(1) > table   tr > td > table "
// var moviesOggi="#main > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody  tr > td:nth-child(2) > table > tbody > tr >td:first-child >a"
var moviesOggi = "tr > td:nth-child(2) > table  tr >td:first-child >a"
var orari = "tr > td[align=right]";

var url = 'http://www.cinemaeliseo.it';
function getMovies() {
    return new Promise((res, rej)=> {

        x(url, base + moviesOggi, [{title: "", detail: "@href"}])(function (err, movies) {
            res(movies)
        });
    })
}

function getOrari() {
    return new Promise((res, rej)=> {

        x(url, base + orari, [{orari: ""}])(function (err, response) {
            res(response)
        });
    })
}
Promise.all([
    getMovies()
    , getOrari()
]).then(([movies,orari])=> {
    return movies.map((movie, i)=> {
        return Object.assign(movie, orari[i], qs.parse(movie.detail.split("?")[1]));
    })
})

    .then(response=> {
        var oreRegEXP = /([01]\d|2[0-3])[:|.]?[0-5]\d/gi;
        var a=new Date();
        return response.map(movie=> {
            var days_list = [
                {
                    day: Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
                    , fascie: (movie.orari.match(oreRegEXP) || []).map(a=>a.replace(".", ":"))
                }
            ];
            return Object.assign({days_list}, movie)
        })
    })
    .then(response=>{
        var a=new Date();
        normalize.normalize(Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())+"__eliseo-movies.json")(response);
    });


// .write('results.json');
