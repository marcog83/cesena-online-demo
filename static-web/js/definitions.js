!function(factory){
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.

        define(factory);

    } else if (typeof module === 'object' && module.exports) {

        // Node. Does not work with strict CommonJS, but

        // only CommonJS-like environments that support module.exports,

        // like Node.

        module.exports = factory;

    }
}({
    "perfect-scrollbar": "modules/perfect-scrollbar/perfect-scrollbar"
    , "search-toolbar": "modules/search/search-toolbar"
    , "map": "modules/map/map"
    , "filtra-listing": "modules/listing/filtra-listing"
    , "lazy-background": "modules/lazy-image-loader/lazy-background"
    , "lazy-image": "modules/lazy-image-loader/lazy-image"
    , "service-worker": "modules/service-worker/service-worker-browser"
    , "add-photo-input": "modules/user/add-photo-input"
    , "add-ccomment-input": "modules/user/add-comment-input"
    , "popup": "modules/popup/popup"
    , "fine-uploader": "modules/fine-uploader/fine-uploader"
    , "add-comment": "modules/comments/add-comment"
    , "add-comment-input": "modules/comments/add-comment-input"
    , "popup-close-button": "modules/popup/popup-close-button"
    , "add-place": "modules/search/add-place"
    , "textarea-autogrow": "modules/comments/textarea-autogrow"
    , "hamburger-menu": "modules/hamburger-menu/hamburger-menu"
    , "menu-visibility": "modules/menu/topbar-menu-visibility"
    , "right-sidebar": "modules/menu/right-sidebar"
    , "movie-programmazione-oggi": "modules/movie/programmazione-oggi"
});