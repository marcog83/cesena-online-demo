define(function (require, exports, module) {
    'use strict';
    var most = require("most");
    module.exports = function (node, dispatcher) {
        var orarioBtns = [].slice.call(node.querySelectorAll(".js-orario"), 0);
        var movies = [].slice.call(node.querySelectorAll(".js-movie"), 0);
        var oClick = orarioBtns.reduce(function (prev, curr) {
            var click = most.fromEvent("click", curr)
                .map(function (e) {
                    return e.currentTarget.dataset.fascia;
                });
            return prev.merge(click);
        }, most.empty());
        oClick
            .startWith(orarioBtns[0].dataset.fascia)
            .forEach(function (fascia) {
                movies.forEach(function (movie) {
                    if (movie.dataset.fascie.match(fascia)) {
                        movie.classList.remove("hidden")
                    } else {
                        movie.classList.add("hidden");
                    }
                })
            })
    };
});