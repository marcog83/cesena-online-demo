/**
 * Created by mgobbi on 23/05/2016.
 */
define(function (require) {
    var fetch = require("fetch");
    var R = require("ramda");
    var qs = require("qs");


    function paramsTransformer(method,url,params){
        var spec = {
            method: method,
            mode: "cors",
            //credentials: 'same-origin',
            credentials: 'include',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json; charset=utf-8'

            }
        };
        if (params && Object.keys(params).length) {
            if (method.toLowerCase() === "post") {
                spec.body = JSON.stringify(params);
            } else {
                url = url.match(/\?/g) ? url + "&" : url + "?";
                url = url + qs.stringify(params,{ indices: false });
            }
        }
        return {
            url:url,
            spec:spec
        }
    }
    var load = R.curryN(3, function (method, url, params) {
        var transformer=paramsTransformer(method, url, params);

        return fetch(transformer.url, transformer.spec).then(function (response) {
            return response.json().then(function (data) {
                return data.body;
            })
        })
    });

    return {
        get: load("GET"),
        post: load("POST"),
        load: load

    };
});
