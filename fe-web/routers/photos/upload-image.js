var fs = require('fs');
var busboy = require('connect-busboy');

module.exports = (req, res)=> {
    return new Promise((resolve, reject)=> {
        var fstream;
          req.pipe(req.busboy);
        var finished=false;
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            fstream = fs.createWriteStream(__dirname + '/../../../static-web/uploads/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Uploaded: " + filename);
                finished=true;
                resolve({status: "OK",type:"image", image_path: "/static/uploads/" + filename});
            });
            fstream.on('error', function () {
                console.log("Uploaded error: " + filename);
                reject({status: "KO"});
            });
        });
        req.busboy.on('finish', function() {
            console.log('Done parsing form!');
            if(!finished){
                resolve({status: "OK"});
            }

        });
    })

};