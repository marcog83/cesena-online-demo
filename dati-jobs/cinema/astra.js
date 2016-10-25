var fs = require("fs");
var qs = require("qs");
var Xray = require('x-ray');
var x = Xray();
var normalize = require("./normalize-movies");
var url = 'http://www.cinemastra.it/';

var title = "#main > section > div > article > h2 > a";
function getMovies() {
    return new Promise((res, rej)=> {

        x(url, "body", {

            title: title
            , detail: title + "@href"
            , orari: x(".orari li", [{
                data: ".data"
                , ziua: ".ziua"
                , ora: ".ora"
            }])
        })(function (err, items) {
            //  var items=JSON.parse(JSON.stringify(items));
            items.title = items.title.trim().replace("\n\t\t\t", "");
            items.id = items.title;
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
        return [response].map(movie=> {
            var days_list = movie.orari.map(orario=> {
                var oreRegEXP = /([01]\d|2[0-3])[:|.]?[0-5]\d/gi;
                var daysReg = /gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre/gi;
                var mese = mesiENG[orario.data.match(daysReg)[0].toLowerCase()];
                var giorno = orario.data.match(/\d{2}|\d/gi)[0];
                var day = new Date(`${mese} ${giorno} 2016`);
                day = Date.UTC(day.getFullYear(), day.getMonth(), day.getDate());
                return {
                    day
                    , fascie: (orario.ora.match(oreRegEXP) || []).map(a=>a.replace(".", ":"))
                }
            });
            return Object.assign({days_list}, movie);
        })
    })

    .then(normalize.normalize("astra-movies.json"));