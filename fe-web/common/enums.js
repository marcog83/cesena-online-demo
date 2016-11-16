const PLACE_DETAIL = "place-detail";
const PLACE_MOVIE_DETAIL = "place-cinema-detail";
const EVENT_DETAIL = "event-detail";
const EVENTS_LISTING = "events-listing";
const PLACES_LISTING = "listing";
const HOMEPAGE = "homepage";
const MOVIES_LISTING = "movies-listing";


exports.PLACE_DETAIL = PLACE_DETAIL;
exports.PLACE_MOVIE_DETAIL = PLACE_MOVIE_DETAIL;
exports.EVENT_DETAIL = EVENT_DETAIL;
exports.EVENTS_LISTING = EVENTS_LISTING;
exports.PLACES_LISTING = PLACES_LISTING;
exports.HOMEPAGE = HOMEPAGE;
exports.MOVIES_LISTING = MOVIES_LISTING;


exports.getStylesheet = function (id) {
    var link = "";
    switch (id) {
        case PLACE_DETAIL:
            link = "<link rel='stylesheet' href='/static/css/place-detail.css'/>";
            break;
        case PLACE_MOVIE_DETAIL:
            link = "<link rel='stylesheet' href='/static/css/place-cinema-detail.css'/>";
            break;
        case EVENT_DETAIL:
            link = "<link rel='stylesheet' href='/static/css/event-detail.css'/>";
            break;
        case EVENTS_LISTING:
            link = "<link rel='stylesheet' href='/static/css/events-listing.css'/>";
            break;
        case PLACES_LISTING:
            link = "<link rel='stylesheet' href='/static/css/listing.css'/>";
            break;
        case HOMEPAGE:
            link = "<link rel='stylesheet' href='/static/css/homepage.css'/>";
            break;
        case MOVIES_LISTING:
            link = "<link rel='stylesheet' href='/static/css/movies-listing.css'/>";
            break;

    }
    return function () {
        return link;
    }

};