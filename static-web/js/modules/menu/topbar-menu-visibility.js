define(function (require, exports, module) {
    'use strict';
    var Scheduler = require("./scroll-scheduler");

    return function (node) {



        Scheduler.oTick
            .skipRepeats()
            .map(function (direction) {
                return direction ? "add" : "remove";
            }).forEach(function (method) {
            node.classList[method]("closed");
        })

    }
});