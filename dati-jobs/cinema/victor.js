var fs = require("fs");
var qs = require("qs");
var Xray = require('x-ray');
var x = Xray();
var normalize = require("./normalize-movies");
var url = 'http://www.cineteatrovictor.it/';
function getMovies() {
    return new Promise((res, rej)=> {

        x(url, ".wp_theatre_event", [{
            orari: {
                day: ".wp_theatre_event_date",
                start_time: ".wp_theatre_event_starttime"
            }
            , title: ".wp_theatre_event_title"
            , detail: "a@href"
        }])(function (err, items) {
            res(items)
        });
    })
}
var mesiENG = {
    gennaio: "January"
    , febbraio: "February"
    , marzo: "march"
    , aprile: "April"
    , maggio: "may"
    , giugno: "June "
    , luglio: "July"
    , agosto: "August"
    , settembre: "September"
    , ottobre: "October"
    , novembre: "November"
    , dicembre: "December"
};
getMovies()
    .then(response=> {
        var oreRegEXP = /([01]\d|2[0-3])[:|.]?[0-5]\d/gi;
        var monthReg = /gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre/gi;

        return response.map(movie=> {
            var day = movie.orari.day.split(" ");
            var month = mesiENG[day[1].match(monthReg)[0].toLowerCase()];
            day = new Date(`${day[0]} ${month} ${day[2]}`);
            var days_list = [
                {
                    day: Date.UTC(day.getFullYear(), day.getMonth(), day.getDate())
                    , fascie: movie.orari.start_time.match(oreRegEXP).map(a=>a.replace(".", ":"))
                }
            ];
            return Object.assign({days_list}, movie)
        })
    })
    .then(normalize.normalize("victor-movies.json"));