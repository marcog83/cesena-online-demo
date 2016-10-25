var express = require('express'),
    places = require('./places');
var exphbs = require("express-handlebars");
var path = require("path");
var R = require("ramda");
var Handlebars = require("handlebars");
var HandlebarsIntl = require('handlebars-intl');
HandlebarsIntl.registerWith(Handlebars);
var KEY = "AIzaSyA2awqLXHWlJuyI5mLY2du4NcuA7OYgpus";
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

var getCategories = R.compose(
    R.map(category=> {
        return Object.assign({query: encodeURIComponent(category.name)}, category);
    }),
    R.uniqBy(R.prop("id")),
    R.filter(R.identity),
    R.flatten,
    R.map(place=> {
        return place.category_list
    })
)


var app = express();
app.use('/static', express.static(__dirname + '/../static-web'));

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('.hbs', exphbs({
    defaultLayout: 'layout'
    , extname: '.hbs'
    , layoutsDir: "render/layout/"
    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
    , partialsDir: "render"
}));
app.set('views', 'render/body/');


app.set('view engine', '.hbs');

app.get('/places/:id', function (req, res) {
    var id = decodeURIComponent(req.params.id);
    Promise.all([
        places.findByChannel(id, {limit: 500})
    ])
        .then(([places])=> {
            res.render('listing', {
                helpers: {
                    stylesheet: function () {
                        return "<link rel='stylesheet' href='/static/css/listing.css'/>"
                    }
                }
                , places
                , categories: getCategories(places)
                , data: {intl: intl}
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
    Promise.all([

        places.eventi({start_time: new Date(), limit: 3})
        , places.eventi({start_time: d, limit: 3 * 9})

    ]).then(([oggiEventi,altriEventi])=> {
        res.render('events-listing', {
            helpers: {
                stylesheet: function () {
                    return "<link rel='stylesheet' href='/static/css/events-listing.css'/>"
                }
            }
            , oggiEventi
            , altriEventi
            , data: {intl: intl}
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
        return places.findMyPlaceByFacebookId(eventDetail.place.id || eventDetail.place)
            .then(my_place=> {
                return places.eventiByPlace({start_time: new Date(), limit: 3, id_place: my_place.id})
            })
            .then(eventiCorrelati=> {
                return [eventDetail, eventiCorrelati]
            })
    }).then(([eventDetail,eventiCorrelati])=> {
        res.render('event-detail', Object.assign({
            helpers: {
                stylesheet: function () {
                    return "<link rel='stylesheet' href='/static/css/event-detail.css'/>"
                }
            }
            , data: {intl: intl}
            , eventiCorrelati
        }, eventDetail));
    }).catch(e=> {
        console.error(e);
        res.status(404)        // HTTP status 404: NotFound
            .send(e.message);
    })
});





app.get('/places/detail/:id', function (req, res) {
    var id = req.params.id;
    Promise.all([
        places.eventiByPlace({start_time: new Date(), limit: 3, id_place: id})
        , places.photosById(id)
        , places.findById(id)
    ])
        .then(([eventiEvidenza,photos,detail])=> {



            res.render('place-detail', Object.assign({
                helpers: {
                    stylesheet: function () {
                        return "<link rel='stylesheet' href='/static/css/place-detail.css'/>"
                    }
                }
                , eventiEvidenza
                , photos
                , data: {intl: intl}

            }, detail));
        }).catch(e=> {
            console.error(e);
            res.status(404)        // HTTP status 404: NotFound
                .send(e.message);
        })
});
app.get('/', function (req, res) {
    Promise.all([
        places.eventi({start_time: new Date(), limit: 3})
        , places.findByChannel("locali", {limit: 3 * 3})
        , places.photosHighlight({limit: 3 * 3})
    ]).then(([eventiEvidenza,placesEvidenza,photos])=> {

        res.render('homepage', {
            helpers: {
                stylesheet: function () {
                    return "<link rel='stylesheet' href='/static/css/homepage.css'/>"
                }
            }
            , oggiCinema: []
            , eventiEvidenza
            , placesEvidenza
            , photos
            , data: {intl: intl}
        });
    }).catch(e=> {
        console.error(e);
        res.status(404)        // HTTP status 404: NotFound
            .send(e.message);
    })

});
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'));
console.log('Listening on port 3000...');

 