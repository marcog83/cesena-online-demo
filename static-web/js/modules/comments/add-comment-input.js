define(function (require, exports, module) {
    'use strict';
    var enums = require("../../common/enums");
    var rjs = require("robojs");
var photoModel=require("../photos/model");
    return function(node,dispatcher){
        var template = document.getElementById("add-comment-template").innerHTML;
        photoModel.setPlace(node.dataset.placeId,node.dataset.placeName);
        node.addEventListener("click",function(){
            dispatcher.dispatchEvent(new rjs.RJSEvent(enums.PopupEvent.OPEN, {

                template: template
            }))
        })
    }
});