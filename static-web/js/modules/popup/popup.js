define(function (require, exports, module) {
    'use strict';
    var enums = require("../../common/enums");
    var rjs = require("robojs");
    return function (node, dispatcher) {
        dispatcher.addEventListener(enums.PopupEvent.OPEN, function (e) {
            node.classList.remove("hidden");
            var template = e.data.template;
            node.querySelector(".popup-CNT").innerHTML = template;
        });

        dispatcher.addEventListener(enums.PopupEvent.CLOSE, function (e) {
            node.classList.add("hidden");

            node.querySelector(".popup-CNT").innerHTML = "";
        })
    }
});