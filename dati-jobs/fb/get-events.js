var R = require('ramda');

function getEvent(place, i) {
    return (place.events && place.events.data || []).map(event=> {
        return Object.assign({}, event, {
            place: (event.place && event.place.id ) || place.id
            , __provider: "facebook"

        })
    })


}
function getPost(place, i) {
    return (place.posts && place.posts.data || []).map(post=> {
        return Object.assign({}, post, {
            __provider: "facebook"
        })
    })

}
function getPhoto(place, i) {
    return (place.photos && place.photos.data || []).map(event=> {
        return Object.assign({}, event, {
            __provider: "facebook"
        })
    })

}

exports.getEvents = (details)=>R.flatten(details.map(getEvent));
exports.getPosts = (details)=>R.flatten(details.map(getPost));
exports.getPhotos = (details)=>R.flatten(details.map(getPhoto));


function getRelationEvent(place, i) {
    return (place.events && place.events.data || []).map(event=> {
        return {
            provider: "facebook"
            , place: {
                id: null
                , id_facebook: place.id
                , id_google: null
                , id_opendata: null
            }
            , event: {
                id_facebook: event.id
                , id_google: null
                , id_opendata: null
                , id: null
            }
        }
    })


}
function getRelationPost(place, i) {
    return (place.posts && place.posts.data || []).map(post=> {
        return {
            provider: "facebook"
            , place: {
                id: null
                , id_facebook: place.id
                , id_google: null
                , id_opendata: null
            }
            , post: {
                id_facebook: post.id
                , id_google: null
                , id_opendata: null
                , id: null
            }
        }
    })

}
function getRelationPhoto(place, i) {
    return (place.photos && place.photos.data || []).map(photo=> {
        return {
            provider: "facebook"
            , place: {
                id: null
                , id_facebook: place.id
                , id_google: null
                , id_opendata: null
            }
            , photo: {
                id_facebook: photo.id
                , id_google: null
                , id_opendata: null
                , id: null
            }
        }
    })

}

//
exports.getRelationEvents = (details)=>R.flatten(details.map(getRelationEvent));
exports.getRelationPosts = (details)=>R.flatten(details.map(getRelationPost));
exports.getRelationPhotos = (details)=>R.flatten(details.map(getRelationPhoto));