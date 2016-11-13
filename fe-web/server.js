var express = require('express'), places = require('./places');
var movies = require("./movies");
let search = require("./search");
var placeDetail = require("./filters/place-detail/place-detail");
var exphbs = require("express-handlebars");
var path = require("path");
var R = require("ramda");
var qs = require("qs");
var bodyParser = require('body-parser');
var Handlebars = require("handlebars");
var HandlebarsIntl = require('handlebars-intl');
HandlebarsIntl.registerWith(Handlebars);

const intl = {
    "locales": "en-US", "formats": {
        "date": {
            "short": {
                "day": "numeric", "month": "long", "year": "numeric"
            }
        }
    }
};
Handlebars.registerHelper('raw-helper', function(options) {
    return options.fn();
});

var getCategories = function (id, filters, categories) {
    return R.compose(
        R.sortBy(R.compose(R.toLower, R.prop('name')))
        , R.filter(category=>category.name != id)
        , R.map(category=> {
            var _filters = [];
            if (filters.includes(category)) {
                _filters = R.without([category], filters);
            } else {
                if (id != category)
                    _filters = R.uniq(filters.concat(category));
            }
            var prefix = _filters.length ? "?" : "";
            var query_string = encodeURIComponent(id) + prefix + qs.stringify({filters: _filters}, {indices: false});
            var active = [id].concat(filters).includes(category) ? "active" : "";
            return {
                active, query: query_string, name: category
            }
        }), R.uniq, R.filter(R.identity), R.flatten, R.map(place=> {
            return place.category_list
        }))(categories)
};


var app = express();
app.use('/static', express.static(__dirname + '/../static-web'));
// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('.hbs', exphbs({
    defaultLayout: 'layout', extname: '.hbs', layoutsDir: "render/layout/"
    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
    , partialsDir: "render"
}));

app.set('views', 'render/body/');
app.set('view engine', '.hbs');
//
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
//
app.get('/places/:id', function (req, res) {
    var id = decodeURIComponent(req.params.id);
    var filters = [];
    if (req.query.filters) {
        if (R.is(String, req.query.filters)) {
            filters = [req.query.filters];
        } else {
            filters = req.query.filters
        }
    }
    Promise.all([places.findByChannel(id, {filters, limit: 500})]).then(([places])=> {
        res.render('listing', {
            helpers: {
                stylesheet: function () {
                    return "<link rel='stylesheet' href='/static/css/listing.css'/>"
                }
            }, places, main_category: {
                query: encodeURIComponent(id), label: id
            }, categories: getCategories(id, filters, places), data: {intl: intl}
        });
    }).catch(e=> {
        console.error(e);
        res.status(404)        // HTTP status 404: NotFound
            .send(e.message);
    })
});
app.get("/events", function (req, res) {
    var d = new Date();
    d.setDate(d.getDate() - 5);
    Promise.all([places.eventi({start_time: new Date(), limit: 3}), places.eventi({
        start_time: d, limit: 3 * 30
    })]).then(([oggiEventi,altriEventi])=> {
        res.render('events-listing', {
            helpers: {
                stylesheet: function () {
                    return "<link rel='stylesheet' href='/static/css/events-listing.css'/>"
                }
            }, oggiEventi, altriEventi, data: {intl: intl}
        });
    }).catch(e=> {
        console.error(e);
        res.status(404)        // HTTP status 404: NotFound
            .send(e.message);
    })
});
app.get("/events/:id", function (req, res) {
    var id = req.params.id;
    places.findEventById(id).then(eventDetail=> {
        return places.findMyPlaceByFacebookId((eventDetail.owner && eventDetail.owner.id) || eventDetail.place).then(my_place=> {
            return places.eventiByPlace({start_time: new Date(), limit: 3, id_place: my_place._id})
        }).then(eventiCorrelati=> {
            return [eventDetail, eventiCorrelati]
        })
    }).then(([eventDetail,eventiCorrelati])=> {
        res.render('event-detail', Object.assign({
            helpers: {
                stylesheet: function () {
                    return "<link rel='stylesheet' href='/static/css/event-detail.css'/>"
                }
            }, data: {intl: intl}, eventiCorrelati
        }, eventDetail));
    }).catch(e=> {
        console.error(e);
        res.status(404)        // HTTP status 404: NotFound
            .send(e.message);
    })
});
app.get('/places/detail/:id', function (req, res) {
    var id = req.params.id;
    placeDetail.details(id, res);
});
app.get('/', function (req, res) {
    Promise.all([places.eventi({
        start_time: new Date(), limit: 3
    }), places.findByChannel("bar", {
        limit: 3 * 3,
        filters: []
    }), places.photosHighlight({limit: 3 * 3})]).then(([eventiEvidenza,placesEvidenza,photos])=> {
        res.render('homepage', {
            helpers: {
                stylesheet: function () {
                    return "<link rel='stylesheet' href='/static/css/homepage.css'/>"
                }
            }, oggiCinema: [], eventiEvidenza, placesEvidenza, photos, data: {intl: intl}
        });
    }).catch(e=> {
        console.error(e);
        res.status(404)        // HTTP status 404: NotFound
            .send(e.message);
    })
});
app.get("/movies", function (req, res) {
    movies.getMovies().then(movies=> {
        res.render("movies-listing", {
            helpers: {
                stylesheet: function () {
                    return "<link rel='stylesheet' href='/static/css/movies-listing.css'/>"
                }
            }, movies
        })
    })
});


app.post("/search", function (req, res) {
    search.search(req.body.query).then(response=> {
        res.json(response);
    });
    console.log(req.body);

});
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));
console.log('Listening on port 3000...');

 