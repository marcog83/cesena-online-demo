var express = require('express');
var router = express.Router();
const {search}=require("./manager");
// define the detail route
router.post("/", function (req, res) {
    search(req.body.query).then(response=>res.json(response));
    console.log(req.body.query);

});

module.exports = router;