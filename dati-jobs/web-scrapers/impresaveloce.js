var Xray = require('x-ray');
var R = require("ramda");
var fs = require("fs");
var x = Xray();
var Connection = require("../db/db-connection").Connection;
var Tables = require("../db/tables");

function getImprese() {
    return new Promise(resolve=> {
        var html = fs.readFileSync("imprese.html");
        x(html, ".scheda_azienda", [{
            name: 'a strong',
            address: 'div:nth-child(2)',
            href: "a@href"

        }])(function (err, schede) {
            resolve(schede);

            //  fs.writeFileSync("impresa-veloce.json", JSON.stringify(schede));
        });
    })
}
function getDetail(url, i) {
    return new Promise(resolve=> {

        setTimeout(_=> {
            x(url, {
                title: '.company-name .ragsoc',
                categories: '.company-name .nomesettore'
                , telephone: ".company-right .clr:nth-child(2)"
            })(function (err, detail) {
                if (err) {
                    console.log(i, "error", err);
                    resolve({});
                } else {
                    resolve(detail);
                }

            });
        }, 1000 * i);
    });
}

function grabImprese(){
    getImprese().then(imprese=> {

        return Promise.all(imprese.map((impresa, i)=> {
            return new Promise(resolve=> {
                getDetail(impresa.href, i).then(detail=> {
                    console.log(i, impresa.name);
                    detail.telephone = detail.telephone.replace(/Telefono:/gi, "").trim();
                    resolve(Object.assign(detail, impresa));
                })
            })
        }))

    }).then(schede=> {
        fs.writeFileSync("impresa-veloce.json", JSON.stringify(schede));
    });
}

function importToMDB(){
    Promise.resolve(JSON.parse(fs.readFileSync("impresa-veloce.json")))
        .then(imprese=> {
            var connection = new Connection();
            return connection.connect()
                .then(db=> {
                    var coll = db.collection(Tables.IMPRESE);
                    return coll.insertMany(imprese)
                        .then(R.tap(_=>connection.db.close()))
                        .catch(R.tap(_=>connection.db.close()))

                })
        })
        .then(R.tap(_=>process.exit(0)))
        .catch(R.tap(_=>process.exit(1)));
}



