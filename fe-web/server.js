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
const qs = require("qs");
const bodyParser = require('body-parser');
const handlebars = require('./render/handlebars-config');

const options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert:  fs.readFileSync(__dirname + '/server.crt')
};
var app = express();
handlebars(app);

app.use('/static', express.static(__dirname + '/../static-web'));


//
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true, keepExtensions: true  })); // for parsing application/x-www-form-urlencoded
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
app.use('/',  express.static(__dirname ));
//
const PORT = process.env.PORT || 5000;
app.set('port', PORT);
app.use(function(req, res, next) {
    res.setHeader("Service-Worker-Allowed", "/");
    return next();
});
spdy .createServer(options, app)
.listen(app.get('port'), (error) => {
        if (error) {
            console.error(error);
            return process.exit(1)
        } else {
            console.log('Listening on port: ' + app.get('port') + '.')
        }
    })

 