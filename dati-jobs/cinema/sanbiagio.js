var fs = require("fs");
var qs = require("qs");
var Xray = require('x-ray');
var x = Xray();
var normalize = require("./normalize-movies");
var url = 'http://www.comune.cesena.fc.it/sanbiagiocesena/programmazione';
var base = "#Programmazione > div > div > div.Layout > div.ColCent > div > div > div.BLOBWidth100 > div.BLOBWidth50"
function getMovies() {
    return new Promise((res, rej)=> {

        x(url, base, [{
            sala: ">div:first-child"
            , movies: x("div:nth-child(2) li", [{
                title: ">p strong:first-child",
                programmazione: ".Info"
                , orari: ">p"
                , detail: ">a@href"
            }])
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
        return response.reduce(function (prev, curr) {
            return prev.concat(curr.movies.map(movie=> {
                return Object.assign(movie, {
                    id: movie.detail.split("/").slice(-1)[0]
                    , sala: curr.sala
                    , orari: (movie.orari
                        .split(/\t\t\t\t|\n\t\t\t\t/g)[3]
                        .split(/orari:/g)[1]
                        .split(/L|M|M|G|V|S|D/g)
                        .filter(day=>day.trim().length) || [])
                        .map(day=>day
                            .replace(/unedì/g, "lunedì")
                            .replace(/artedì/g, "martedì")
                            .replace(/ercoledì/g, "mercoledì")
                            .replace(/iovedì/g, "giovedì")
                            .replace(/enerdì/g, "venerdì")
                            .replace(/abato/g, "sabato")
                            .replace(/omenica/g, "domenica")
                        )
                })
            }))
        }, [])
    })
    .then(response=> {
        var oreRegEXP = /([01]\d|2[0-3])[:|.]?[0-5]\d/gi;
        var monthReg = /gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre/gi;

        return response.map(movie=> {

            var days_list = movie.orari.map(orario=> {
                var oreIndex = orario.lastIndexOf("ore");

                var fascie = [];


                if (oreIndex != -1) {
                    fascie = ((orario.slice(oreIndex) || "").match(oreRegEXP) || []).map(a=>a.replace(".", ":"));

                }
                var day = (orario.slice(0, oreIndex) || "").replace(/lunedì|martedì|mercoledì|giovedì|venerdì|sabato|domenica/gim, "").trim();
                if (!day.match(monthReg)) {
                    return undefined;
                }
                var mese = mesiENG[day.match(monthReg)[0].toLowerCase()];
                var giorno = (day.match(/\d{2}|\d/gi) || [])[0];
                day = new Date(`${mese} ${giorno} 2016`);
                day = Date.UTC(day.getFullYear(), day.getMonth(), day.getDate());

                return {
                    day
                    , fascie
                }
            }).filter(day=>day);
            return Object.assign({days_list}, movie)
        })
    })
    .then(normalize.normalize("sanbiagio-movies.json"));