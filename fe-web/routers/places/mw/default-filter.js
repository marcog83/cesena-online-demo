const {eventiByPlace}=require("../../events/manager");

const {photosById}=require("../../photos/manager");
const {findById}=require("../manager");
const intl = require('../../../intl/intl');
const enums=require("../../../common/enums");

module.exports = function render(req, res,next) {
    var id = req.params.id;
    return Promise.all([
        eventiByPlace({start_time: new Date(), limit: 3, id_place: id})
        , photosById(id)
        , findById(id)
    ])
        .then(([eventiEvidenza,photos,detail])=> {


            res.render(enums.PLACE_DETAIL, Object.assign({
                helpers: {
                    stylesheet: enums.getStylesheet(enums.PLACE_DETAIL)
                }
                , eventiEvidenza
                , photos
                , page_id: id
                , data: {intl: intl}

            }, detail));
        }).catch(e=> {
            console.error(e);
            res.status(404)        // HTTP status 404: NotFound
                .send(e.message);
        })
};