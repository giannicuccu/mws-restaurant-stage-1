// self.addEventListener('install', function(event) {
//     event.waitUntil(
//       caches.open('restaurant-reviews-v5').then(function(cache) {
//         return cache.addAll([
//           '/', 
//           '/restaurant.html',          
//           '/js/dbhelper.js',
//           '/data/restaurants.json',
//           //'https://normalize-css.googlecode.com/svn/trunk/normalize.css',
//           'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'

//         ]);
//       })
//     );
//   });
console.log('pippo');
self.addEventListener('fetch', function(event) {
    console.log('My-FETCH'+event.request.url);
  });