/**
 * Created by mgobbi on 04/04/2016.
 */

var http = require('http');
var https = require('https');
var api = require('instagram-node').instagram();

var first={
    client_id: '886876dde3ab4e8992c7051aad51f0f6',
    client_secret: 'f14b808d192d47d98b8785afa8dc99db'
};
var second={
    client_id: '62eb996e020b4bafbd6b944c0e335267',
    client_secret: 'e06b38ed6a544c8dafec891354d73a81'
};
api.use(first);


api.use({access_token: '1430774001.886876d.bfc4242dce6649578024a695462c8624'});


function send(id, cb) {
    var options = {
        host: "www.instagram.com",
        port: "",
        method: "GET",
        path: "/explore/locations/{{id}}/?__a=1".replace("{{id}}", id),

        headers: {}
    };
    options.headers['Content-Type'] = 'application/json';

    var req = https.request(options, function (res) {
        var body = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var result;
            var limit = parseInt(res.headers['x-ratelimit-limit'], 10) || 0;
            var remaining = parseInt(res.headers['x-ratelimit-remaining'], 10) || 0;


            try {
                result = JSON.parse(body);
            } catch (err) {
                return cb(err, null, res.statusCode, body);
            }

            return cb(null, result, remaining, limit);
        });
    });
    req.end();
}

//

module.exports = function ({place_id,i}) {

    return new Promise(function (resolve, reject) {
        setTimeout(function(){
            api.location_search({facebook_places_id: place_id}, function (err, result, remaining, limit) {
                if (err) {
                //    console.log(err);
                    resolve([]);
                    return;
                }
                if (!result[0]) {
                    resolve([]);
                    return;
                }
                var place = result[0].id;

              setTimeout(_=>{
                  //https://www.instagram.com/explore/locations/345031147/?__a=1
                  send(place, function (err, result, remaining, limit) {
                      if (err) {
                        //  console.log(err);
                          resolve([]);
                      } else {
                          var photos =(result.location && result.location.media && result.location.media.nodes) || [];
                          resolve(photos);
                      }

                      //console.log(err, result, remaining, limit);
                  });
              },2000)

            });
        },6000*i)
    });

};

// https://api.instagram.com/oauth/authorize/?client_id=886876dde3ab4e8992c7051aad51f0f6&redirect_uri=http://localhost&response_type=token&scope=public_content+comments+relationships+likes+follower_list