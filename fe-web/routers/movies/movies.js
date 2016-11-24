const enums = require("../../common/enums");
var express = require('express');
var router = express.Router();
const {getMovies}=require("./manager");
const Seo = require('../../plugins/seo/seo-meta');
// define the detail route
router.get("/", function (req, res) {
    getMovies().then(movies=> {
        var seo=Seo.getSeoMeta({
            title:"Cesena Online :: Movies"
            ,url:"/movies"
        });
        res.render(enums.MOVIES_LISTING, {
            helpers: {
                stylesheet: enums.getStylesheet(enums.MOVIES_LISTING)
            }, movies,seo
        })
    })
});

module.exports = router;