
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('restaurant-reviews-00')
      .then(function(cache) {
        return cache.addAll([
          '/', 
          '/restaurant.html',
          '/css/styles.css',
          '/data/restaurants.json',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/img/offlinemap.png',
          'https://cdn.jsdelivr.net/npm/normalize.css@8.0.0/normalize.css',
          'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
          'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
          'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
          'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png',
          'https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png'

        ]);
      })
    );
  });


  self.addEventListener('activate', function(event) {
    event.waitUntil(clients.claim());
  });


  self.addEventListener('fetch', function(event) {

    if(event.request.url.includes('restaurant.html')){
    event.respondWith(
      caches.match('/restaurant.html').then(function(response){                
          return response ;
        })
    );
        
  }else{

    event.respondWith(
      caches.match(event.request)
      .then(function(response) {
        return response || fetchAndCache(event.request);
      })
    );
  }
  });
  
  function fetchAndCache(url) {
    return fetch(url)
    .then(function(response) {

      //Check if we received a valid response
      // if ( !response.ok && response.type !== 'opaque') {
      //   console.log(response)
      //   throw new Error(response.status);
      //   //return caches.match('/img/offlinemap.png');
      // }

      return caches.open('restaurant-reviews-00')
      .then(function(cache) {
        if (response.type !== 'opaque'){          
          cache.put(url, response.clone());
          return response;
        }
        else {return response}
      });
    })
    .catch(function(error) {
      console.log('Request failed:', url);
      
     /* TODO: check if is a request for map images url.url.contains('MAP URL STRING PATTERN') */
      return caches.match('/img/offlinemap.png');
      
    });
  }






  

  // self.addEventListener('fetch', function(event) {
  //   console.log('FETCHING '+ event.request.url)
  //   event.respondWith(
  //     caches.match(event.request)
  //       .then(function(response) {
  //         // Cache hit - return response
  //         if (response) {
  //           return response;
  //         }
  
  //         // IMPORTANT: Clone the request. A request is a stream and
  //         // can only be consumed once. Since we are consuming this
  //         // once by cache and once by the browser for fetch, we need
  //         // to clone the response.
  //         var fetchRequest = event.request.clone();
  
  //         return fetch(fetchRequest).then(
  //           function(response) {
  //             // Check if we received a valid response
  //             if(!response || response.status !== 200 || response.type !== 'basic') {
  //                 //debugger
  //                 console.log('NOT BASIC'+response.url)
  //               return response;
  //             }
  
  //             // IMPORTANT: Clone the response. A response is a stream
  //             // and because we want the browser to consume the response
  //             // as well as the cache consuming the response, we need
  //             // to clone it so we have two streams.
  //             var responseToCache = response.clone();
  
  //             caches.open('restaurant-reviews-12')
  //               .then(function(cache) {
  //                   //debugger
  //                 cache.put(event.request, responseToCache);
  //               });
  
  //             return response;
  //           }
  //         );
  //       })
  //     );
  // });;