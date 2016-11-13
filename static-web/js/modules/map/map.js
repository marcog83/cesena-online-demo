define(function (require, exports, module) {
    'use strict';
    module.exports =function (node){

        var uluru = {lat: Number(node.dataset.lat), lng: Number(node.dataset.lng)};
        var map = new google.maps.Map(node, {
            zoom: 18,
            center: uluru
            , scrollwheel: false
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    };
});