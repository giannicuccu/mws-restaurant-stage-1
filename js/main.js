
/*REGISTER SERVICE WORKER*/
/**/

if (!navigator.serviceWorker) {
  console.log('NO SERVICE WORKER')
}else{
  //navigator.serviceWorker.register('/worker.js').then(function() {
    navigator.serviceWorker.register('/worker.js').then(function() {
    console.log('Registration worked!');
  }).catch(function() {
    console.log('Registration failed!');
  });

};




let restaurants,
  neighborhoods,
  cuisines
var newMap
var markers = []

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  initMap(); // added 
  fetchNeighborhoods();
  fetchCuisines();
});

/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}

/**
 * Initialize leaflet map, called from HTML.
 */
initMap = () => {
  self.newMap = L.map('map', {
        center: [40.722216, -73.987501],
        zoom: 12,
        scrollWheelZoom: false
      });
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token=pk.eyJ1IjoiZ2JxcSIsImEiOiJjamo3ZWx2MXcwMjM1M3FtcXM4OW9rMzZzIn0.r2-ir2FtdEDp8UVj2hjaWA', {
    mapboxToken: 'pk.eyJ1IjoiZ2JxcSIsImEiOiJjamo3ZWx2MXcwMjM1M3FtcXM4OW9rMzZzIn0.r2-ir2FtdEDp8UVj2hjaWA',
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(newMap);

  updateRestaurants();
}
/* window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });
  updateRestaurants();
} */

/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  if (self.markers) {
    self.markers.forEach(marker => marker.remove());
  }
  self.markers = [];
  self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');

  // Add a text with results number 
  const resultsLabel = document.getElementById('resultsLabel');
  if(restaurants.length > 1){
    resultsLabel.innerText = restaurants.length + ' Restaurants found' ;
  } else if(restaurants.length === 1){
    resultsLabel.innerText = '1 Restaurant found' ;
  }else{
    resultsLabel.innerText = 'No Restaurants found';
  }

  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');
  li.tabIndex = '0';

  // Add picture element and some  sources (webp and small images)

  const picture = document.createElement('picture');
  const sourceWebP = document.createElement('source');
  sourceWebP.type = 'image/webp';
  sourceWebP.srcset = '/dist/img/' + DBHelper.imageNameForRestaurant(restaurant) + '.webp';
  sourceWebP.media = "(min-width: 426px)";

  const sourceJpgSmall = document.createElement('source');
  sourceJpgSmall.type = 'image/jpg';
  sourceJpgSmall.srcset = '/dist/img/' + DBHelper.imageNameForRestaurant(restaurant) + '-small.jpg';
  sourceJpgSmall.media = "(max-width: 425px)";

  const image = document.createElement('img');
  image.className = 'restaurant-img';

  // Add ALT attribute
  image.setAttribute('alt', 'Picture of ' + restaurant.name + ''); // add alt attr to image
  image.src = DBHelper.imageUrlForRestaurant(restaurant);

 
  picture.append(sourceWebP);
  picture.append(sourceJpgSmall);
  picture.append(image)

  li.append(picture);

  const name = document.createElement('h1');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.setAttribute('aria-label', restaurant.name+' details'); // add aria label attribute to details btn
  more.href = DBHelper.urlForRestaurant(restaurant);
  li.append(more)

  return li
}

/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.newMap);
    
    //Add Enter key support on marker icon
    marker.on("keypress", function(e){
      if(e.originalEvent.keyCode === 13){
        window.location.href = marker.options.url
      }
    });

    marker.on("click", function(e){
      window.location.href = marker.options.url
    });
    
    
    self.markers.push(marker);

  });

} 


/* addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
} */
// function updateIndicator() {
// 	if(navigator.onLine) { // true|false
//     alert('online')
//   }else{alert('offline')}
// }

// // Update the online status icon based on connectivity
// window.addEventListener('online',  updateIndicator());
// window.addEventListener('offline', updateIndicator());




