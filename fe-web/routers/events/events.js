var express = require('express');
var R = require('ramda');
var router = express.Router();
const intl = require('../../intl/intl');
const Seo = require('../../plugins/seo/seo-meta');
const SeoUrl = require('../../plugins/seo/seo-url');
const {findEventById,eventiByPlace,eventi}=require("./manager");
const {findMyPlaceByFacebookId}=require("../places/manager");
const enums=require("../../common/enums");
// define the detail route
router.get("/", function (req, res) {
    var start_time = new Date(Date.UTC());
    start_time.setHours(0,0,0,0);
    var end_time= new Date(Date.UTC());
    end_time.setDate(end_time.getDate()+1);
    end_time.setHours(0,0,0,0);
    Promise.all([eventi({start_time,end_time, limit: 3}), eventi({
        start_time, limit: 3 * 30
    })]).then(([oggiEventi,altriEventi])=> {
        var seo=Seo.getSeoMeta({
            title:"Cesena Online :: Eventi"
            ,url:"/events"
        });
        //
        if(oggiEventi){
            var idsOggi=oggiEventi.map(evento=>evento._id.toString());
            altriEventi=R.filter(evento=>!idsOggi.includes(evento._id.toString()),altriEventi);
        }


        res.render(enums.EVENTS_LISTING, {
            helpers: {
                stylesheet: enums.getStylesheet(enums.EVENTS_LISTING)
            },seo, oggiEventi, altriEventi, data: {intl: intl}
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

        eventiCorrelati=R.filter(evento=>evento._id.toString()!=eventDetail._id.toString(),eventiCorrelati);

        var seo=Seo.getSeoMeta({
            title:"Cesena Online :: Eventi - "+eventDetail.name
            ,url:`/${SeoUrl.createURL(eventDetail.name)}`
            ,image:eventDetail.image
            ,description:eventDetail.raw_description
        });

        res.render(enums.EVENT_DETAIL, Object.assign({
            seo,
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