/**
 * Created by mgobbi on 18/11/2016.
 */
define(function (require) {
   // var cf=require("../../common/constant-factory");

    return function(node,dispatcher){
        if("serviceWorker" in navigator){
            var url_sw="/static/js/modules/service-worker/service-worker.js";//;cf.provide(cf.Type.CONFIGURATION).SERVICE_WORKER_URL;
            navigator.serviceWorker.register(url_sw,{ scope: '/' })
                .then(function(registration){
                    // registration.unregister();
                })
                .catch(function(a) {console.log(a)});
            navigator.serviceWorker.ready
                .then(function(a) {console.log("ready",a)})
                .catch(function(a) {console.log("ready catch",a)})
        }
    };
});