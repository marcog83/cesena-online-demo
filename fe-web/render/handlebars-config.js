const Handlebars = require("handlebars");
const HandlebarsIntl = require('handlebars-intl');
const exphbs = require("express-handlebars");
HandlebarsIntl.registerWith(Handlebars);
Handlebars.registerHelper('raw-helper', function (options) {
    return options.fn();
});
module.exports=function(app){
    // Register `hbs` as our view engine using its bound `engine()` function.
    app.engine('.hbs', exphbs({
        defaultLayout: 'layout'
        , extname: '.hbs'
        , layoutsDir: "fe-web/render/layout/"
        // Uses multiple partials dirs, templates in "shared/templates/" are shared
        // with the client-side of the app (see below).
        , partialsDir: "fe-web/render"
    }));

    app.set('views', 'fe-web/render/body/');
    app.set('view engine', '.hbs');
};