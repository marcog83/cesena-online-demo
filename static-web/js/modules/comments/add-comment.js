define(function (require, exports, module) {
    'use strict';
    var enums = require("../../common/enums");
    var photoModel = require("../photos/model");
    var rjs = require("robojs");
    module.exports = function (node, dispatcher) {
        var imageCTR = node.querySelector(".js-image");
        var image = node.querySelector(".js-image img");
        var imageFile = photoModel.getImage();
        if (imageFile) {
            var fr = new FileReader();
            fr.onload = function () {
                image.src = fr.result;
                imageCTR.classList.remove("hidden");
            };
            fr.readAsDataURL(imageFile);
        }
        var pubblicaBtn = node.querySelector(".js-submit");
        pubblicaBtn.addEventListener("click", function () {
            photoModel.send().then(function (response) {
                console.log(response, "UPLOAD DONE");
                dispatcher.dispatchEvent(new rjs.RJSEvent(enums.PopupEvent.CLOSE));
            }).catch(function (e) {
                console.log(e, "ERRORE UPLOAD")
            })

        });
        dispatcher.addEventListener(enums.PopupEvent.CLOSE, photoModel.reset.bind(photoModel));
        var textArea = node.querySelector(".js-textarea");
        textArea.addEventListener("keyup", function () {
            photoModel.setMessage(textArea.value);
        })

    };
});