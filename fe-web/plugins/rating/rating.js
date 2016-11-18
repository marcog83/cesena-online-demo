var express = require('express');
var router = express.Router();
const intl = require('../../intl/intl');
const {getRate, setRate}=require("./manager");

router.get("/:category/:id", function (req, res) {
    getRate(req.body.query).then(response=>res.json(response));

});
router.get("/:category/:id/:value", (req, res)=> {
    var {category, id, value}=req.params;
    setRate(res.body).then(response=>res.json(response));
});

module.exports = router;