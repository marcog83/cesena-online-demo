/**
 * Created by mgobbi on 04/04/2016.
 */
// Using require() in ES2015
// Using require() in ES5
var FB = require('fb');
// var categories = require('./category-list');
var instagram = require('../instagram');
var fs = require("fs");


function getAccessToken() {
    return new Promise(function (resolve, reject) {
        FB.api('oauth/access_token', {
            client_id: '889152471205018',
            client_secret: '8a57908b9d5cb304a2478944381cf8b3',
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
            center: "44.1571,12.265",
            type: "place",
            distance: 15000,
            limit: 5000,
            fields: [ 'about', 'name', 'location',"description","category","category_list" , "bio"]
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

function getInstagram(place,i) {
    return instagram(place.id,i).then(function (photos) {

        return {
            id_facebook: place.id,
            instagram_photos: photos
        };
    }).catch(function (e) {
        console.log("getInstagram", e);
        return {
            id_facebook: place.id,
            instagram_photos: []
        };
    });
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

exports.getInstagram=places=> Promise.all(places.map(getInstagram));

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




