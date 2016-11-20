define(function (require, exports, module) {
    'use strict';
    module.exports = function (node) {
        function textAreaAdjust(text) {

            setTimeout(function(){
                text.style.height = 'auto';
                text.style.height = text.scrollHeight+'px';
            },0)
        };

        node.addEventListener("keyup", function () {
            textAreaAdjust(node);
        });
    };
});