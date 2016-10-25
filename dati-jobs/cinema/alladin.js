var qs = require("qs");

var Xray = require('x-ray');
var x = Xray();
var helper = require("./test-orari");
var normalize = require("./normalize-movies");


var url = 'http://www.incinema.it/default.asp?Context=D';
let programmazione = "body > center > table  tr:nth-child(2) > td > table  tr > td:nth-child(2) > div > table tr:nth-child(1) > td:nth-child(2) > font > i b";

var orari = "tr > td > a";


var base = "body > center > table tr:nth-child(2) > td > table tr > td:nth-child(2) > div > table  tr > td:nth-child(2)[valign=top]";
function getMovies() {
    return new Promise((res, rej)=> {

        x(url, base, {

            movies: [{title: "a > i b", detail: "a@href"}]
            , orari: [" table:nth-child(3) "]
        })(function (err, items) {
            res(items)
        });
    })
}
function getProgrammazione() {
    return new Promise((res, rej)=> {

        x(url, programmazione)(function (err, items) {
            res(items)
        });
    })
}
Promise.all([
    getProgrammazione()
    , getMovies()
])
    .then(([program,movies])=> {
        return movies.movies.map((movie, i)=> {
            return Object.assign(movie, {
                orari: {
                    programmazione: program
                    , date: movies.orari[i]
                }
                , id: qs.parse(movie.detail.split("?")[1]).Film_Id
            });
        });

    }).then(helper.getAlladinOrari)
    .then(normalize.normalize("alladin-movies.json"));
