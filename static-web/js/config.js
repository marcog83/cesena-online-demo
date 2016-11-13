require.config({
    paths:{
        perfect_scrollbar:"./libs/perfect-scrollbar.min"
        ,most:"../bower_components/most/dist/most.min"
        ,ramda:"../bower_components/ramda/dist/ramda.min"
        ,qs:"../bower_components/qs/dist/qs.min"
        ,handlebars:"../bower_components/handlebars/handlebars.amd.min"
        ,robojs:"../bower_components/robojs/dist/robojs.es6.min"
        ,fetch:"../bower_components/fetch/fetch"
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