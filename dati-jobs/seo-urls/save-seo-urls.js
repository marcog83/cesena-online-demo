const SeoUrl = require("../../fe-web/plugins/seo/seo-url");
const Connection = require("../db/db-connection").Connection;
const Tables = require("../db/tables");
const fs = require("fs");
function getPlaces() {
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.MY_PLACES_2))
        .then(coll=> {
            return coll.find({}).toArray()
        })
        .then(places=> {
            return Promise.all(places.map(place=> {
                return SeoUrl.save(SeoUrl.createURL(place.name), `/places/detail/${place._id.toString()}`)
            }))
        })
        .then(_=>connection.db.close())
        .catch(_=>connection.db.close());
}
function getEvents() {
    var eventsConnection = new Connection();

    return eventsConnection.connect()
        .then(eventsConnection.collection.bind(eventsConnection, Tables.MY_EVENTS))
        .then(coll=> {
            return coll.find().toArray()
        })
        .then(places=> {
            return Promise.all(places.map(place=> {
                return SeoUrl.save(SeoUrl.createURL(place.name), `/events/${place._id.toString()}`)
            }))
        })
        .then(_=>eventsConnection.db.close())
        .catch(_=>eventsConnection.db.close());

}

Promise.all([
    getEvents()
     , getPlaces()
]).then(_=> {
    var seoConnection = new Connection();
    seoConnection.connect()
        .then(seoConnection.collection.bind(seoConnection, Tables.SEO_URLS))
        .then(coll=> {
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
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`).concat("</urlset>");
            fs.writeFileSync("sitemap-seo.xml", xml);
            process.exit(0)
        })

});
