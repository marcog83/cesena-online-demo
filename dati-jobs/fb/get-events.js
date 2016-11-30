var R = require('ramda');
function utcTimestamp(date) {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(),
        date.getUTCMilliseconds());
}
function getEvent(place, i) {
    return (place.events && place.events.data || []).map(event=> {
        return Object.assign({}, event, {
            owner: R.view(R.lensPath(["owner", "id"]), event) ? event.owner : {name: place.name, id: place.id}
            , place: R.view(R.lensPath(["place", "id"]), event) ? event.place : {
                name: place.name,
                location: place.location,
                id: place.id_facebook
            }
            , __provider: "facebook"
            , start_time: utcTimestamp(new Date(event.start_time))
            , end_time: utcTimestamp(new Date(event.end_time))

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