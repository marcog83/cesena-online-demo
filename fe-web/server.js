const express = require('express');

const spdy = require('spdy');


const fs = require('fs');

const comment = require('./routers/comments/comment');
const places = require('./routers/places/places');
const search = require("./routers/search/search");
const events = require("./routers/events/events");
const homepage = require("./routers/homepage/homepage");
const movies = require("./routers/movies/movies");

const path = require("path");
const compression = require("compression");
var minifyHTML = require('express-minify-html');
const qs = require("qs");
const bodyParser = require('body-parser');
const handlebars = require('./render/handlebars-config');

var app = express();

app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     false,
        minifyJS:                  false
    }
}));
app.use(compression());

handlebars(app);

app.use('/static', express.static(__dirname + '/../static-web',{
    maxAge: '5d'
    ,etag:"strong"
}));


//
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true, keepExtensions: true})); // for parsing application/x-www-form-urlencoded
//
app.use('/places', places);
app.use("/search", search);
//
app.use("/events", events);
//
app.use("/movies", movies);
//
comment(app);
app.use('/', homepage);

//
const PORT = process.env.PORT || 5000;
app.set('port', PORT);


var bootstrap = app;

var args = require("minimist")(process.argv.slice(2));

if (args.ambiente == "LOCAL") {
    const options = {
        key: fs.readFileSync(__dirname + '/server.key'),
        cert: fs.readFileSync(__dirname + '/server.crt')
    };
    bootstrap = spdy.createServer(options, app)
}

//

bootstrap.listen(app.get('port'), (error) => {
    if (error) {
        console.error(error);
        return process.exit(1)
    } else {
        console.log('Listening on port: ' + app.get('port') + '.')
    }
});

 