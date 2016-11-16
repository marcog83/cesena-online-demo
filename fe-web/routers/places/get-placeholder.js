let rules = require("../../../dati-jobs/fb/find-categories");
var PLACEHOLDERS = {
    benessere: rules.BENESSERE
    , viaggiare: rules.BUSISNESS
    , busisness: rules.BUSISNESS
    , food: rules.FOOD
    , locali: rules.LOCALI
    , tech: rules.TECH
    , music: rules.MUSICA
    , health: rules.SALUTE
    , architecture: rules.ARCHITETTURA
    , arts: rules.ARTS
    , "movie-theater": rules.TEATRI_CINEMA
    , sports: rules.SPORTS
    , piadineria: rules.PIADINERIE

};
module.exports = function (place) {
    var name = Object.keys(PLACEHOLDERS).filter(key=> {
            return place.category_list.toString().match(PLACEHOLDERS[key]);
        })[0] || "null";
    name = "/static/img/placeholder-cover-" + name + ".jpg";
    return name
};