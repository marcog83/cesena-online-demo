const express = require('express');
const places = require('./routers/places/places');
const search = require("./routers/search/search");
const events = require("./routers/events/events");
const homepage = require("./routers/homepage/homepage");
const movies = require("./routers/movies/movies");

const path = require("path");
const qs = require("qs");
const bodyParser = require('body-parser');
const handlebars = require('./render/handlebars-config');


var app = express();
handlebars(app);
app.use('/static', express.static(__dirname + '/../static-web'));


//
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
//
app.use('/places', places);
app.use("/search", search);
//
app.use("/events", events);
//
app.use("/movies", movies);
//
app.use('/', homepage);
//
const PORT = process.env.PORT || 5000;
app.set('port', PORT);
app.listen(app.get('port'));
console.log(`Listening on port ${PORT}...`);

 