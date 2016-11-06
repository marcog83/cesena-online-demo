var Xray = require('x-ray');
var R = require("ramda");
var fs = require("fs");
var x = Xray();
//

function getCategories() {
    var url = "http://www.elencoaziendeitaliane.it/citta.php?id=40007";
    var base = "body > div > table tr:nth-child(2) > td > table tr:nth-child(1) > td > table tr > td:nth-child(3) > table tr:nth-child(3) > td > table tr > td:nth-child(2) > table:nth-child(3)";
    return new Promise((res, rej)=> {

        x(url, base,{
            links:x("strong",[{label: "a", href: "a@href"}])
        })(function (err, items) {

            if (err) {
                console.log("error getCategories", err);
                res([])
            } else {
                res(items.links);
            }
        });
    })
}

function getPagination(url, i) {
    //
    var base = ".pagination li:not(.active)";
    return new Promise((res, rej)=> {
        setTimeout(_=> {
            x(url, base, ["a@href"])(function (err, items) {
                if (err) {
                    console.log("error pagination", err);
                    res([])
                } else {
                    res(items);
                }

            })
        }, 500 * i);
    })
}

function getImprese(url, i = 0) {
    //
    var base = "body .scheda_azienda";
    return new Promise((res, rej)=> {
        setTimeout(_=> {
            x(url, base, [{

                name: "a strong"
                , address_1: "div:nth-child(2)"
                , address_2: "div:nth-child(3)"


            }])(function (err, items) {
                if (err) {
                    console.log(err);
                    res([]);
                } else {
                    console.log(url, i, items.length);
                    res(items)
                }

            });
        }, 1000 * i);

    })
}

getCategories().then(response=> {

    return Promise.all(response.map((category, i)=> {
        return getImprese(category.href, i).then(imprese=>{
            return {
                label:category.label
                ,imprese
            }
        })
    }))
}).then(categories=> {
    fs.writeFileSync("imprese.json", JSON.stringify(categories))
})