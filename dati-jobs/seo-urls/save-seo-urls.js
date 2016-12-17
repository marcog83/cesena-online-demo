const SeoUrl = require("../../fe-web/plugins/seo/seo-url");
const Connection = require("../db/db-connection").Connection;
const Tables = require("../db/tables");
const fs = require("fs");
function getPlaces(db) {
    var seoColl = db.collection(Tables.SEO_URLS);
    var coll = db.collection(Tables.MY_PLACES_2);
    return coll.find({}).toArray()
        .then(places=> {
            return Promise.all(places.map(place=> {
                return SeoUrl.save(seoColl,SeoUrl.createURL(place.name), `/places/detail/${place._id.toString()}`)
            }))
        })

}
function getEvents(db) {
    var coll = db.collection(Tables.MY_EVENTS);
    var seoColl = db.collection(Tables.SEO_URLS);
    return coll.find().toArray().then(places=> {
        return Promise.all(places.map(place=> {
            return SeoUrl.save(seoColl,SeoUrl.createURL(place.name), `/events/${place._id.toString()}`)
        }))
    })


}
var seoConnection = new Connection();


seoConnection.connect()
    .then(function (db) {
        return Promise.all([
            getEvents(db)
            , getPlaces(db)
        ])
    })

    .then(_=> {
        var coll=seoConnection.db.collection( Tables.SEO_URLS);
        return coll.find({}).toArray();
    })
    .then(urls=> {
        var template = `<url>
                          <loc>https://cesena-online.herokuapp.com/{{name}}</loc>
                          <changefreq>never</changefreq>
                          <priority>1</priority>
                        </url>`;
        var xml = urls.reduce((prev, curr)=> {
            var str = template.replace(/\{\{name\}\}/gim, curr.name);
            return prev.concat(str);
        }, `<?xml version="1.0" encoding="UTF-8"?>
                <urlset
                      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`)
            .concat("</urlset>");
        fs.writeFileSync("sitemap-seo.xml", xml);
        process.exit(0)
    });

