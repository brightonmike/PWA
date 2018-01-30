(function() {
  'use strict';

  let CACHE_NAME = 'my-awesome-cache';

  let urls_to_Cache = [
    '.',
    'index.html',
    'styles/main.css'
  ];

  // TODO 2.1 - Cache static assets on install

  self.addEventListener('install', function(event){

        event.waitUntil(
            caches.open(CACHE_NAME)
            .then(function(cache){
                return cache.addAll(urls_to_Cache);
            })
        );

  });

  // TODO 2.2 - Fetch from the cache

  self.addEventListener('fetch', function(event){

        event.responeWith(

            caches.match(event.request)
            .then(function(response){

                if(!response.ok){
                    throw Error(response.statusText);
                }

                return caches.open(CACHE_NAME)
                .then(function(cache){
                    cache.put(url, response.clone());
                    return response;
                });

            })

            .catch(function(error){
                console.log('Request failed:', error);
            })


        );

  });

})();
