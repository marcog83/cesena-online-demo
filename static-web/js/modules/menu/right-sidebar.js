define(function (require, exports, module) {
    'use strict';
    var perfectScroll = require("../perfect-scrollbar/perfect-scrollbar");
    var menuVisibility = require("./topbar-menu-visibility");
    module.exports = function (node, dispatcher) {
        perfectScroll(node, dispatcher);
        menuVisibility(node, dispatcher);

        var moreCategories = node.querySelector(".js-more-categories");
        moreCategories.addEventListener("click", function () {

            node.classList.toggle("opened");
            var isOpened=node.classList.contains("opened");
            if(isOpened){
                document.body.classList.add("overflow-hidden");
            }else{
                document.body.classList.remove("overflow-hidden");
            }

        })
    };
});