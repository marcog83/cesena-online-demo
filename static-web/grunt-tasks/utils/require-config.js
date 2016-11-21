/**
 * Created by mgobbi on 18/09/2015.
 */

var definitions = require("../../js/definitions");
module.exports = {
    options: {
        paths: {
            perfect_scrollbar:"./libs/perfect-scrollbar.min"
            ,most:"../bower_components/most/dist/most.min"
            ,"@most/create":"../node_modules/@most/create/dist/create.min"
            ,"@most/multicast":"../node_modules/@most/multicast/dist/multicast.min"
            ,"@most/prelude":"../node_modules/@most/prelude/dist/prelude.min"
            ,ramda:"../bower_components/ramda/dist/ramda.min"
            ,qs:"../bower_components/qs/dist/qs.min"
            ,handlebars:"../bower_components/handlebars/handlebars.amd.min"
            ,robojs:"../bower_components/robojs/dist/robojs.es6"
            ,fetch:"../bower_components/fetch/fetch"

            ,"delegate":"../bower_components/delegate/dist/delegate"
        },

        shim: {
            perfect_scrollbar:{
                exports:"Ps"
            }
            ,fetch:{
                exports:"fetch"
            }
        }


    }, definitions: definitions,
    libraries: function () {
        return Object.keys(this.options.paths);
    },
    empty: function () {
        return Object.keys(this.options.paths).reduce(function (prev, curr) {
            prev[curr] = "empty:";
            return prev;
        }, {requireLib: "../bower_components/requirejs/require"})
    },

    get modules() {
        var defs = definitions;
        return Object.keys(defs).map(function (key) {
            return "./" + defs[key];
        })
    }


};