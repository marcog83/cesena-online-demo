/**
 * Created by mgobbi on 24/11/2016.
 */
const R=require("ramda");
exports.getSeoMeta = (params={})=> {
    var defaultMeta={
        title: "Cesena Online"
        , url: "https://cesena-online.herokuapp.com"
        , site_name: "cesena-online"
        , description: "Cesena-online raccoglie  da internet tutte le informazioni che trova a proposito di Cesena,  mostrandole in una maniera organica, per mettere in luce ciò che succede sul territorio e dare una visione a 360 gradi della città, viva e piena di realtà da scoprire."
        , image: "https://cesena-online.herokuapp.com/static/img/share-image.jpg"
    };
    params.url=params.url && "https://cesena-online.herokuapp.com"+params.url;

    return {
        title: R.defaultTo(defaultMeta.title,params.title)
        , url: R.defaultTo(defaultMeta.url,params.url)
        , site_name:  R.defaultTo(defaultMeta.site_name,params.site_name)
        , description:  R.defaultTo(defaultMeta.description,params.description)
        , image:  R.defaultTo(defaultMeta.image,params.image)
    }
};