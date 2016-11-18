/*
 Copyright 2014 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */


// While overkill for this specific sample in which there is only one cache,
// this is one best practice that can be followed in general to keep track of
// multiple caches used by a given service worker, and keep them all versioned.
// It maps a shorthand identifier for a cache to a specific, versioned cache name.

// Note that since global state is discarded in between service worker restarts, these
// variables will be reinitialized each time the service worker handles an event, and you
// should not attempt to change their values inside an event handler. (Treat them as constants.)

// If at any point you want to force pages that use this service worker to start using a fresh
// cache, then increment the CACHE_VERSION value. It will kick off the service worker update
// flow and the old cache(s) will be purged as part of the activate event handler when the
// updated service worker is activated.
var CACHE_VERSION = "0.0.2";
var CURRENT_CACHES = {
    prefetch: 'prefetch-cache-v' + CACHE_VERSION,
    contents: "contents-v" + CACHE_VERSION
};




//
// function prefetch(urlsToPrefetch) {
//     return caches.open(CURRENT_CACHES['prefetch']).then(function (cache) {
//
//         return cache.addAll(urlsToPrefetch).then(function () {
//             console.log('All resources have been fetched and cached.');
//         });
//     }).catch(function (error) {
//         // This catch() will handle any exceptions from the caches.open()/cache.addAll() steps.
//         console.error('Pre-fetching failed:', error);
//     })
// }
//
//
self.addEventListener('install', function(event) {
    // Skip the 'waiting' lifecycle phase, to go directly from 'installed' to 'activated', even if
    // there are still previous incarnations of this service worker registration active.
    console.log("installing")
});
self.addEventListener('activate', function(event) {
    // Delete all caches that aren't named in CURRENT_CACHES.
    // While there is only one cache in this example, the same logic will handle the case where
    // there are multiple versioned caches.
    var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
        return CURRENT_CACHES[key];
    });

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (expectedCacheNames.indexOf(cacheName) === -1) {
                        // If this cache name isn't present in the array of "expected" cache names, then delete it.
                        console.log('Deleting out of date cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

//On network response

self.addEventListener('fetch', function (event) {

    if(matchContents(event.request)){
        console.log('Handling fetch event for', event.request.url);
        return event.respondWith(getContentsPromise(event));
    }


});



function matchContents(request){
    return request.url.match(/optimized|\.[js|css|jpg|png|gif|svg|woff2|ttf]/gim);
}

function fetchPromise(cache,event){
    return fetch(event.request ).then(function (response) {
        console.log('  Response for %s from network is: %O',
            event.request.url, response);
        console.log('  Caching the response to', event.request.url);
        cache.put(event.request, response.clone());
        return response;
    });
}

function getContentsPromise(event) {
    return caches.open(CURRENT_CACHES.contents).then(function (cache) {
        return cache.match(event.request).then(function (response) {
            if (response) {
                // If there is an entry in the cache for event.request, then response will be defined
                // and we can just return it. Note that in this example, only font resources are cached.
                console.log(' Found response in cache:', response);

                return response;
            }

            return  fetchPromise(cache,event);
        })
    })
}



