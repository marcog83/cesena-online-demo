define(function (require) {
    var most = require("most");
    var HB = require("handlebars");
    var Delegate = require("delegate");
    var rjs = require("robojs");
    var service = require("../../common/JSONService");
    var enums = require("../../common/enums");
    var photoModel = require("../photos/model");
    return function (node, dispatcher) {
        var template = HB.compile(document.getElementById("add-photo-template").innerHTML);

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
            .startWith("cesena")
            .flatMap(function (query) {
                return most.of(SEARCH_URL)
                    .until(most.fromEvent("keyup", input))
                    .flatMap(function (url) {
                        return most.fromPromise(service.post(url, {query: query}));
                    })
            }).forEach(updateDOM);
        var addPlaceButton = node.querySelector(".js-button");
        var placeLabel = node.querySelector(".js-place-label");
        var placeContainer = node.querySelector(".js-place-autocomplete");
        addPlaceButton.addEventListener("click", function () {
            placeContainer.classList.remove("hidden");
            node.classList.add("opened");
            document.querySelector(".add-comment-popup").classList.add("add-place-opened");
        });

        var place=photoModel.getPlace();
        if(place.name){
            placeLabel.innerHTML=place.name;
            placeLabel.classList.remove("hidden");

        }

        var delegate = Delegate(placeContainer, "[data-place-id]", 'click', function (e) {
            console.log(e.delegateTarget);
            photoModel.setPlace(e.delegateTarget.dataset.placeId, e.delegateTarget.dataset.placeName);
            placeContainer.classList.add("hidden");
            node.classList.remove("opened");
            document.querySelector(".add-comment-popup").classList.remove("add-place-opened");
            placeLabel.classList.remove("hidden");
            dispatcher.dispatchEvent(new rjs.RJSEvent(enums.CommentsEvent.UPDATE_PLACE, photoModel.getPlace()));
            placeLabel.innerHTML = photoModel.getPlace().name;
        }, false);
        var annullaAddPlace=node.querySelector(".js-annulla-add-place");
        annullaAddPlace.addEventListener("click",function(){
            placeContainer.classList.add("hidden");
            placeLabel.classList.add("hidden");
            node.classList.remove("opened");
            document.querySelector(".add-comment-popup").classList.remove("add-place-opened");
            photoModel.setPlace(null,null);
            placeLabel.innerHTML = "";
        })

    }
});