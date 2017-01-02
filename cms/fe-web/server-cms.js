
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true, keepExtensions: true})); // for parsing application/x-www-form-urlencoded
//


app.use('/', express.static(__dirname + '/../',{
    maxAge: '5d'
    ,etag:"strong"
}));
app.use("/index" , express.static(__dirname + '/render/layout.html'));
const PORT = process.env.PORT || 9000;
app.set('port', PORT);





//

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
        return process.exit(1)
    } else {
        console.log('Listening on port: ' + app.get('port') + '.')
    }
});

 