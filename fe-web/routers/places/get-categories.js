var R = require("ramda");
var qs = require("qs");

var getCategories = function (id, filters, categories) {
    return R.compose(
        R.sortBy(R.compose(R.toLower, R.prop('name')))
        , R.filter(category=>category.name != id)
        , R.map(category=> {
            var _filters = [];
            if (filters.includes(category)) {
                _filters = R.without([category], filters);
            } else {
                if (id != category)
                    _filters = R.uniq(filters.concat(category));
            }
            var prefix = _filters.length ? "?" : "";
            var query_string = encodeURIComponent(id) + prefix + qs.stringify({filters: _filters}, {indices: false});
            var active = [id].concat(filters).includes(category) ? "active" : "";
            return {
                active
                , query_filter: query_string
                ,query:category
                , name: category
            }
        }), R.uniq, R.filter(R.identity), R.flatten, R.map(place=> place.category_list))(categories)
};
module.exports=getCategories;