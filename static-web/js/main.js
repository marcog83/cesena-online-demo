define(function (require, exports, module) {
    'use strict';
    var rjs=require("robojs");
    var definitions=require("./definitions");
    module.exports = function(){
        rjs.bootstrap({definitions:definitions,loader:rjs.AMDScriptLoader})
            .then(console.log.bind(console,"DONE"))
            .catch(console.log.bind(console,"FAIL"))
    }
});