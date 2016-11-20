define(function (require) {
    var most = require("most");
    var most_create = require("@most/create");
    var HB = require("handlebars");
    var service = require("../../common/JSONService");
    var Delegate = require("delegate");
    return function (node) {
        var template = HB.compile(document.getElementById("search-template").innerHTML);

        function removeAutocompleteDOM() {
            autocompleteDOM.innerHTML = "";

        }

        function updateDOM(results) {
            if(!results.categories.length && !results.places){
                removeAutocompleteDOM()
            }else{
                var domString = template(results);
                autocompleteDOM.innerHTML = domString;
            }
        };


        var SEARCH_URL = "/search";
        var input = node.querySelector(".js-input");
        var autocompleteDOM = node.querySelector(".js-autocomplete");
        most.fromEvent("keyup", input)
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
            }).forEach(updateDOM);

        var oClickFade = most_create.create(function (add) {
             Delegate(autocompleteDOM, ".fade-autocomplete", "click",function () {

                add();
            })
        });

        most.fromEvent("keyup", input)
            .debounce(100)
            .filter(function () {
                return input.value.length == 0;
            })
            .merge(oClickFade)
            .tap(function(){
                input.value=null;
            })
            .observe(removeAutocompleteDOM)


    }
});