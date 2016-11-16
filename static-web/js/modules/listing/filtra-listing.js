define(function (require) {
    'use strict';
    return function (node) {
        var select=node.querySelector("select");
        select.addEventListener("change", function (e) {
            window.location.href = e.currentTarget.value;
        })
    }
});