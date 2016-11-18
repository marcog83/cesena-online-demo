define(function (require) {

    function dispatchEvent(node, eventName) {
        var evt = document.createEvent('Event');
        evt.initEvent(eventName, true, true);
        node.dispatchEvent(evt);
    }



    return {


        dispatchEvent: dispatchEvent

    }
});