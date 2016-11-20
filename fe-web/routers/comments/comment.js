const busboy = require('connect-busboy');
const R = require('ramda');
const uploadImage = require("../photos/upload-image");
let Connection = require("../../../dati-jobs/db/db-connection").Connection;
let Tables = require("../../../dati-jobs/db/tables");
module.exports = app=> {

    app.post("/upload", busboy(), (req, res)=> {
        Promise.all([
            uploadImage(req, res)
            , new Promise(function (resolve) {
                var count = 0;
                var comment = {};
                var keys = ["place_id", "place_name", "message"];
                req.busboy.on('field', function (key, value, keyTruncated, valueTruncated) {
                    if (keys.includes(key)) {
                        comment[key] = value;
                        count++;
                        if (count >= keys.length) {
                            resolve(comment);
                        }
                    }

                });
            })
        ]).then(([photo,comment])=> {
            var connection = new Connection();
            return connection.connect()
                .then(connection.collection.bind(connection,Tables.MY_IMAGES_COMMENTS))
                .then(coll=> {
                    return coll.insertOne(Object.assign(comment, photo));
                }).then(R.tap(_=>connection.db.close()))
                .catch(R.tap(_=> {
                    connection.db.close();
                    console.log(_);
                    res.send({status: "KO",message:_});

                }))
        })
            .then(response=> {
                res.send({status: "OK"});
            })

    });
};