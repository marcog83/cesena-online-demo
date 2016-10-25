let {Converter} = require("csvtojson");
let fs = require("fs");
exports.getJSON = function (name) {
    return new Promise(resolve=> {
        var converter = new Converter({delimiter: ";"});

//end_parsed will be emitted once parsing finished
        converter.on("end_parsed", function (jsonArray) {
            resolve(jsonArray); //here is your result jsonarray
        });

//read from file
        fs.createReadStream(`./${name}.csv`).pipe(converter);
    }).then(jsonArray=> {
        jsonArray = jsonArray.map(item=> {
            return Object.keys(item)
                .filter(key=>!["field19", "point_x", "point_y"].includes(key.toLowerCase()))
                .reduce((prev, key)=> {
                    prev[key.toLowerCase()] = item[key];
                    return prev
                }, {})
        });
        return jsonArray;


    })

}