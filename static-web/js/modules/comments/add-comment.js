define(function (require, exports, module) {
    'use strict';
    var photoModel = require("../photos/model");
    var rjs = require("robojs");
    module.exports = function (node, dispatcher) {
        var imageCTR = node.querySelector(".js-image");
        var image = node.querySelector(".js-image img");
        var imageFile=photoModel.getImage();
        if(imageFile){
            var fr = new FileReader();
            fr.onload = function () {
                image.src = fr.result;
                imageCTR.classList.remove("hidden");
            };
            fr.readAsDataURL(imageFile);
        }


    };
});