const SeoUrl = require("./plugins/seo/seo-url");

const express = require('express');
var app = express();
app.get("/:id",SeoUrl.middleware);
app.get("/places/detail/:id", function (req, res) {
    console.log("places");
    res.send("default" + req.params.id);
});
app.listen(3000, (error) => {
    if (error) {
        console.error(error);
        return process.exit(1)
    } else {
        console.log('Listening on port: ' + 3000 + '.')
    }
});
SeoUrl.save(SeoUrl.createURL("Curva Mare Stadio Dino Manuzzi"), "/places/detail/583612449044a61eec61cdb8")
    .then(_=>console.log("inserito",_));