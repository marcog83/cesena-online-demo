const express = require('express');
const router = express.Router();
const {findByChannel}=require("./manager");
const getCategories = require("./get-categories");
const intl = require("../../intl/intl");
const enums = require("../../common/enums");
const R = require("ramda");
const defaultFilter = require("./mw/default-filter");
const movieFilter = require("./mw/movie-filter");
const Seo = require('../../plugins/seo/seo-meta');
router.get('/:id', function (req, res) {
    var id = decodeURIComponent(req.params.id);
    var filters = [];
    if (req.query.filters) {
        if (R.is(String, req.query.filters)) {
            filters = [req.query.filters];
        } else {
            filters = req.query.filters
        }
    }
    Promise.all([findByChannel(id, {filters, limit: 500})]).then(([places])=> {
        var seo = Seo.getSeoMeta({
            title: "Cesena Online :: " + id
            , url: `/places/${id}`
        });
        var categories = getCategories(id, filters, places);
        var cat_helper = categories.reduce((p, c)=> {
            p[c.name] = c.name;
            return p;
        }, {});

        // console.log(JSON.stringify(cat_helper));
        var data_intl = {intl: Object.assign(cat_helper, intl)};
        res.render(enums.PLACES_LISTING, {
            seo,
            helpers: {
                stylesheet: enums.getStylesheet(enums.PLACES_LISTING)
            }, places, main_category: {
                query: encodeURIComponent(id), label: id
            }, categories, data: data_intl
        });
    }).catch(e=> {
        console.error(e);
        res.status(404)        // HTTP status 404: NotFound
            .send(e.message);
    })
});


// define the detail route
router.get('/detail/:id', movieFilter, defaultFilter);

module.exports = router;