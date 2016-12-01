const {eventiByPlace}=require("../../events/manager");

const {photosById}=require("../../photos/manager");
const {findById}=require("../manager");
const intl = require('../../../intl/intl');
const enums = require("../../../common/enums");
const Seo = require('../../../plugins/seo/seo-meta');
const SeoUrl = require('../../../plugins/seo/seo-url');
module.exports = function render(req, res, next) {
    var id = req.params.id;
    var start_time = new Date();
    start_time.setHours(0,0,0,0);


    return Promise.all([
            eventiByPlace({start_time, limit: 3*4, id_place: id})
            , photosById(id)
            , findById(id)
        ])
        .then(([eventiEvidenza,photos,detail])=> {

            var photo_count = photos.length;
            var comment_count = 0;
            var events_count = eventiEvidenza.length;
            //
            var seo=Seo.getSeoMeta({
                title:"Cesena Online :: "+detail.name
                ,url:`/${SeoUrl.createURL(detail.name)}`
                ,image:detail.image
                ,description:detail.raw_description
            });
            //
            res.render(enums.PLACE_DETAIL, Object.assign({
                helpers: {
                    stylesheet: enums.getStylesheet(enums.PLACE_DETAIL)
                }
                , eventiEvidenza
                , photos
                , page_id: id
                , data: {intl: intl}

            }, detail, {events_count,photo_count, comment_count,seo}));
        }).catch(e=> {
            console.error(e);
            res.status(404)        // HTTP status 404: NotFound
                .send(e.message);
        })
};