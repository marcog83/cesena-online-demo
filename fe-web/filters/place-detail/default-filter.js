const places = require('../../places');
const intl = {
    "locales": "en-US",
    "formats": {
        "date": {
            "short": {
                "day": "numeric",
                "month": "long",
                "year": "numeric"
            }
        }
    }
};
function render(id, res) {
    return Promise.all([
        places.eventiByPlace({start_time: new Date(), limit: 3, id_place: id})
        , places.photosById(id)
        , places.findById(id)
    ])
        .then(([eventiEvidenza,photos,detail])=> {


            res.render('place-detail', Object.assign({
                helpers: {
                    stylesheet: function () {
                        return "<link rel='stylesheet' href='/static/css/place-detail.css'/>"
                    }
                }
                , eventiEvidenza
                , photos
                , data: {intl: intl}

            }, detail));
        }).catch(e=> {
            console.error(e);
            res.status(404)        // HTTP status 404: NotFound
                .send(e.message);
        })
}
function match() {
    return Promise.resolve(true);
}
module.exports = {
    render,
    match
};