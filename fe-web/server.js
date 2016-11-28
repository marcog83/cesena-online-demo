

var args = require("minimist")(process.argv.slice(2));

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

const qs = require("qs");
const bodyParser = require('body-parser');
const handlebars = require('./render/handlebars-config');
const Redis= require('express-redis-cache');
var app = express();
// var cache;
// if(args.ambiente=="LOCAL"){
//   //  var host="pub-redis-10220.eu-west-1-2.2.ec2.garantiadata.com";
//   //  var port=10220;
//     cache =Redis({
//
//         expire: 60*60*2 //2 ore
//     });
//
// }else{
//     var host="pub-redis-10220.eu-west-1-2.2.ec2.garantiadata.com";
//     var port=10220;
//     cache =Redis({
//         host
//         , port
//         , auth_pass: "D3y5blZ7JD4luLfV"
//         ,expire: 60*60*2 //2 ore
//     });
// }
// app.use(cache.route());

function  cacheMiddleware(seconds){
    return function(req,res,next){
        var date=new Date();
        date.setDate(date.getDate()+1);
        date.setHours(0,0,0,0);
        res.setHeader("Cache-Control", `public, must-revalidate, max-age=${seconds}`);
        res.setHeader("Service-Worker-Allowed", `/`);
        res.setHeader("Expires", date.toString());
        next();
    }
}



app.use(compression());
app.use(cacheMiddleware(3600));
//
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true, keepExtensions: true})); // for parsing application/x-www-form-urlencoded
//


handlebars(app);
app.use("/google2b3a4456558dadd3.html", express.static(__dirname + '/google2b3a4456558dadd3.html'));
app.use("/sitemap.xml", function(req, res,next) {
    res.header('Content-Type', 'application/xml');
    next();

}, express.static(__dirname + '/sitemap.xml'));
app.use('/wireframes', express.static(__dirname + '/../wireframes',{
    maxAge: '5d'
    ,etag:"strong"
}));
app.use('/static', express.static(__dirname + '/../static-web',{
    maxAge: '5d'
    ,etag:"strong"
}));
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

 