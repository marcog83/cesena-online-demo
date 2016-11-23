var express = require('express');
var router = express.Router();
const intl = require('../../intl/intl');
const {findEventById,eventiByPlace,eventi}=require("./manager");
const {findMyPlaceByFacebookId}=require("../places/manager");
const enums=require("../../common/enums");
// define the detail route
router.get("/", function (req, res) {
    var start_time = new Date();
    start_time.setHours(0,0,0,0);
    var end_time= new Date();
    end_time.setDate(end_time.getDate()+1);
    end_time.setHours(0,0,0,0);
    Promise.all([eventi({start_time,end_time, limit: 3}), eventi({
        start_time, limit: 3 * 30
    })]).then(([oggiEventi,altriEventi])=> {
        res.render(enums.EVENTS_LISTING, {
            helpers: {
                stylesheet: enums.getStylesheet(enums.EVENTS_LISTING)
            }, oggiEventi, altriEventi, data: {intl: intl}
        });
    }).catch(e=> {
        console.error(e);
        res.status(404)        // HTTP status 404: NotFound
            .send(e.message);
    })

});
router.get("/:id",function (req, res) {
    var id = req.params.id;
    findEventById(id).then(eventDetail=> {
        return eventiByPlace({start_time: new Date(), limit: 3, id_place: eventDetail.owner._id})
            .then(eventiCorrelati=> {
            return [eventDetail, eventiCorrelati]
        })
    }).then(([eventDetail,eventiCorrelati])=> {
        res.render(enums.EVENT_DETAIL, Object.assign({
            helpers: {
                stylesheet: enums.getStylesheet(enums.EVENT_DETAIL)
            }, data: {intl: intl}, eventiCorrelati
        }, eventDetail));
    }).catch(e=> {
        console.error(e);
        res.status(404)        // HTTP status 404: NotFound
            .send(e.message);
    })
});

module.exports = router;