require.config({
    paths: {
        "libraries": "./libs/libraries"
    }

});
require(["require", "libraries"], function (require) {
    require(["./main"], function (main) {
        main();
    });
});