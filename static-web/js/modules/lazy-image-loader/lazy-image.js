define(function (require) {
    var most = require("most");
    var most_create = require("@most/create");
    var utils = require("../../common/utils");
    var enums = require("../../common/enums");

    return function (node) {
        var image_url = node.dataset.img;
        var threshold = parseInt(node.dataset.threshold) || .1;
        var oVisibility = most_create.create(function (add, end, error) {
            var options = {
                threshold: [threshold]
            };
            var observer = new IntersectionObserver(function (changes) {
                changes
                    .filter(function (change) {
                        return change.intersectionRatio >= threshold
                    })
                    .forEach(add);

            }, options);
            observer.observe(node);

            return function () {
                observer.disconnect();
            }
        }).until(most.fromEvent(enums.DESTROY, node))
            .multicast();
        oVisibility.take(1).forEach(function () {

            var img=new Image();
            img.onload=function(){
                node.src = image_url;

            };
            img.onerror=function(){
                img.src ="/fe-web/img/placeholder-normal.jpg";

                // TweenMax.to(node,.5,{alpha:1});
            };
            img.src = image_url;

        });
        return function () {
            utils.dispatchEvent(node, enums.DESTROY);
        }
    }
});