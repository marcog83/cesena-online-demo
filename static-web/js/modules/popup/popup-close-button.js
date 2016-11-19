define(function (require, exports, module) {
    'use strict';
    var enums = require("../../common/enums");
    var rjs = require("robojs");
    module.exports = function(node,dispatcher){
        node.addEventListener("click",function(){
            dispatcher.dispatchEvent(new rjs.RJSEvent(enums.PopupEvent.CLOSE))
        });
    };
});