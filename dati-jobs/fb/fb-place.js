/**
 * Created by mgobbi on 04/04/2016.
 */
// Using require() in ES2015
// Using require() in ES5
var FB = require('fb');
// var categories = require('./category-list');

var fs = require("fs");
FB.options({version: 'v2.8'});

function getAccessToken() {
    return new Promise(function (resolve, reject) {
        FB.api('oauth/access_token', {
            client_id: '214654845382404',
            client_secret: '55d81ea2021bd08d24ab9b6e619638dd',
            grant_type: 'client_credentials'
        }, function (res) {

            if (!res || res.error) {
                reject(res.error);
                /* console.log(!res ? 'error occurred' : res.error);
                 return;*/
            } else {
                var access_token = res.access_token;
                var expires = res.expires ? res.expires : 0;
                FB.setAccessToken(access_token);
                resolve({
                    access_token: access_token,
                    expires: expires
                })
            }


        });
    })
}
function getPlaces() {
    return new Promise(function (resolve, reject) {

        FB.api('search', {
            center: "44.139551,12.246472",
            type: "place",
            distance: 10000,
            limit: 1500,
            fields: [ 'about', 'name', 'location', "cover","bio","description","category_list"]
        }, function (res) {
            if (!res || res.error) {
                reject(!res ? 'error occurred' : res.error);
                return;
            }
            var places = res.data;

            console.log("search", places.length);
            resolve(places);

        });
    })
}


var since=(new Date().getTime()/1000).toFixed();
function getPlaceDetails(id, i) {

    return new Promise(function (resolve, reject) {
        FB.api(id, {
            fields: [
                "name"
                 
                ,"picture"
                ,"website"
                ,"emails"
                ,"hours"
                ,"company_overview"
                ,"category"
                ,"location"
                ,"category_list"
                , "description"
                , "general_info"
                , "bio"
                , "cover"
                , `events.fields(owner,cover,place,ticket_uri,type,name,description,start_time,end_time).since(${since})`
                , `posts.limit(30).since(${since})`
                , 'photos.limit(30).fields(images,likes,name,link)'
                // , 'instagram_accounts'
            ]
        }, function (res) {
            //  res.category_list = place.category_list;
            if (!res || res.error) {
                console.log("no", res, id);
                resolve({});

                return;
            }

            console.log("si", res.name);
            resolve(res);
        })
    });
}
// FACEBOOK

exports.getPlaces = ()=> getAccessToken().then(getPlaces).then(places=> places.filter(place=>place));

exports.getPlacesDetails = getPlaceDetails;
exports.getAccessToken = getAccessToken;

// exports.getInstagram=places=> Promise.all(places.map(getInstagram));

exports.getPlaceFromLocation=function(place){
   return getAccessToken().then(function(){
        return new Promise(function (resolve, reject) {

            FB.api('search', {
                center: `${place.latitudine},${place.longitudine}`,
                type: "place",
                distance: 50,
                limit: 10,
                fields: ['category_list', 'about', 'name', 'location', 'cover', 'description']
            }, function (res) {
                if (!res || res.error) {
                    reject(!res ? 'error occurred' : res.error);
                    return;
                }
                var places = res.data;

                console.log("search", places.length);
                resolve(places);

            });
        })
    })/*.catch(e=>reject(e))*/
};




