define(function (require, exports, module) {
    'use strict';
    var enums = require("../../common/enums");
    var rjs = require("robojs");
    var photoModel = require("../photos/model");
    return function (node, dispatcher) {
        var input = node.querySelector("input", node);
        var template = document.getElementById("add-comment-template").innerHTML;
        photoModel.setPlace(node.dataset.placeId,node.dataset.placeName);
        input.addEventListener("change", function (e) {
            photoModel.setImage(e.currentTarget.files[0]);
            input.value=null;
            dispatcher.dispatchEvent(new rjs.RJSEvent(enums.PopupEvent.OPEN, {

                template: template
            }))
        })
    }
});