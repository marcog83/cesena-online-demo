define(function (require, exports, module) {
    'use strict';
    var Ps = require("perfect_scrollbar");
    return function (node) {
        Ps.initialize(node, {
            wheelSpeed: 2,
            wheelPropagation: false,
            minScrollbarLength: 20
        });
    }
});