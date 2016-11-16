const enums = require("../../common/enums");
var express = require('express');
var router = express.Router();
const {getMovies}=require("./manager");
// define the detail route
router.get("/", function (req, res) {
    getMovies().then(movies=> {
        res.render(enums.MOVIES_LISTING, {
            helpers: {
                stylesheet: enums.getStylesheet(enums.MOVIES_LISTING)
            }, movies
        })
    })
});

module.exports = router;