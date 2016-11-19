require.config({
    paths:{
        perfect_scrollbar:"./libs/perfect-scrollbar.min"
        ,most:"../bower_components/most/dist/most.min"
        ,"@most/create":"../node_modules/@most/create/dist/create.min"
        ,"@most/multicast":"../node_modules/@most/multicast/dist/multicast.min"
        ,"@most/prelude":"../node_modules/@most/prelude/dist/prelude.min"
        ,ramda:"../bower_components/ramda/dist/ramda.min"
        ,qs:"../bower_components/qs/dist/qs.min"
        ,handlebars:"../bower_components/handlebars/handlebars.amd.min"
        ,robojs:"../bower_components/robojs/dist/robojs.es6"
        ,fetch:"../bower_components/fetch/fetch"

        ,"delegate":"../bower_components/delegate/dist/delegate"
    }
    ,shim:{
        perfect_scrollbar:{
            exports:"Ps"
        }
        ,fetch:{
            exports:"fetch"
        }


    }
});
require(["./main"],function (main) {
   main();
});