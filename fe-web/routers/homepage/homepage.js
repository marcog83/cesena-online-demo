const enums = require("../../common/enums");
const express = require('express');
const {findByChannel}=require("../places/manager");
const {eventi}=require("../events/manager");
const {photosHighlight}=require("../photos/manager");

const intl = require('../../intl/intl');
const router = express.Router();
// define the detail route
router.get('/', function (req, res) {
    Promise.all([eventi({
        start_time: new Date(), limit: 3
    }), findByChannel("bar", {
        limit: 3 * 3,
        filters: []
    }), photosHighlight({limit: 3 * 3})]).then(([eventiEvidenza,placesEvidenza,photos])=> {
        res.render(enums.HOMEPAGE, {
            helpers: {
                stylesheet: enums.getStylesheet(enums.HOMEPAGE)
            }, oggiCinema: [], eventiEvidenza, placesEvidenza, photos, data: {intl: intl}
        });
    }).catch(e=> {
        console.error(e);
        res.status(404)        // HTTP status 404: NotFound
            .send(e.message);
    })
});
module.exports=router;