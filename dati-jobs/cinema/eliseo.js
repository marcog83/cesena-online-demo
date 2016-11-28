var fs = require("fs");
var qs = require("qs");
var Xray = require('x-ray');
var x = Xray();
var normalize = require("./normalize-movies");


var url = 'http://www.cinemaeliseo.it/home.php?a=1';
function getMovies() {
    return new Promise((res, rej)=> {

        x(url, "body", {
            movies:x("#tabs_i2-pane1 > div",[{
                title:"a strong"
                ,detail:"a@href"
                , fascie:["tr:nth-child(2) td:nth-child(3) strong"]
                ,prenota:"tr:nth-child(2)  a:nth-of-type(1)@href"
            }])
            ,day:"#tabs_i2-pane1 > h4"



        })(function (err, movies) {
            res(movies)
        });
    })
}


getMovies().then(movies=> {
        return movies.movies.map((movie, i)=> {
            var a = new Date();
            var days_list = [
                {
                    day: Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
                    , fascie: movie.fascie.map(a=>a.replace(".", ":"))
                }
            ];
            delete movie.fascie
            return Object.assign(movie,
                {days_list},
                qs.parse(movie.detail.split("?")[1]));
        })
    })


    .then(response=> {

        normalize.normalize("eliseo-movies.json")(response);
    });


// .write('results.json');
