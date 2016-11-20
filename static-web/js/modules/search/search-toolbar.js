define(function (require) {
    var most = require("most");
    var HB = require("handlebars");
    var service = require("../../common/JSONService");
    return function (node) {
        var template = HB.compile(document.getElementById("search-template").innerHTML);

        function removeAutocompleteDOM() {
            autocompleteDOM.innerHTML = "";
        }

        function updateDOM(results) {
            var domString = template(results);
            autocompleteDOM.innerHTML = domString;
        };


        var SEARCH_URL = "/search";
        var input = node.querySelector(".js-input");
        var autocompleteDOM = node.querySelector(".js-autocomplete");
        most.fromEvent("keyup", node)
            .debounce(300)
            .filter(function () {
                return input.value.length > 2;
            })
            .tap(removeAutocompleteDOM)
            .map(function (e) {
                return input.value;
            })
            .flatMap(function (query) {
                return most.of(SEARCH_URL)
                    .until(most.fromEvent("keyup", input))
                    .flatMap(function (url) {
                        return most.fromPromise(service.post(url, {query: query}));
                    })
            }).forEach(updateDOM)
    }
});