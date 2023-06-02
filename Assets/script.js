// Working search bar, that interacts with the google API (Carlos)
// -location is picked. and information can be pulled
var searchedCity = $('.input');
var screenMap = $('#map-container');
var Key = 'AIzaSyBXBCuWudNwESA8LytkWrXJ4DQMYvpIWiY';

var map;
var service;

//map variables 
var lat;
var lon;
var poiArray;
var poiLatLon;

//event listener for the search button 
$('.search').on('click', () => {
    searchPlace(searchedCity[0].value);//grab the lat and lon of w.e is inputted
    console.log(lat)
    console.log(lon)

    pointsOfInterest(lat,lon) //enter lats and lon to search points of interest 
    updateMap(lat,lon); //update the map with the location searched
    console.log(poiArray)
})

//function calls the google geocoder api to grab the lat and lon
window.searchPlace = function (city) {
    var geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${Key}&address=${city}`;    //api url to search for a location's latlng
    

    //calls the google geocoding api to grab lat lon of location searched 
    fetch(geocodeApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status} occurred while fetching data.`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'OK') { //only if the input is a valid location address, its latitude and longitude will be stored in variable
                lat = data.results[0].geometry.location.lat;
                lon = data.results[0].geometry.location.lng;
            }
        })
        .catch(error => console.error(error));
};

//generate points of interest at the location entered in search bar 
function pointsOfInterest(lat,lon){
    var cityLatLng = new google.maps.LatLng(lat, lon);
                console.log(cityLatLng)
                //creates a new Map object, and displayed in #map-container in html
                map = new google.maps.Map(document.getElementById('map-container'), { center: cityLatLng, zoom: 15 });   

                var request = {
                    location: cityLatLng,
                    radius: '500',     //radius of location in m
                    types: ['tourist_attraction'] //enter a specified type of location. visit https://developers.google.com/maps/documentation/javascript/supported_types to see a list of supported place types.
                };

                service = new google.maps.places.PlacesService(map);    //  creates a new instance of the PlacesService object provided by the Google Maps Places library, and associating it with the map
                service.nearbySearch(request, callback);    // calls 'nearbySearch' method on the 'PlacesService' instance
}

function callback(results, status) {
    //If the status of the Places API request is OK, it logs the name of each place in the console. If the status is not OK, it logs a message saying that no results were returned.
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        poiArray = results; 
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            console.log(place.name);
        }
    } else {
        console.log('Place search did not return any results.');
    }
}

$(document).ready(function () {

    // Assigns an on click event to the dropdown button
    $(document).on('click', '.Itenerary .dropdown-trigger button', function (event) {
        event.stopPropagation();

        var allActiveIteneraries = $(".Itenerary.is-active");   // stores all active Itenerary elements in variable
        var currentItenerary = $(this).closest('.Itenerary');   // goes through clicked element's parents that matches 'Itenerary'

        // Remove 'is-active' class from all active Iteneraries that aren't the current one]
        allActiveIteneraries.each(function () {  //.each() loops all active itenerary queries
            if (!$(this).is(currentItenerary)) {    // checks if if the 'currentItenerary' is not the same as the element in current iteration
                $(this).removeClass('is-active');
            }
        });

        currentItenerary.toggleClass('is-active'); // Toggle the current dropdown
    });
});

//initializes the map element in the page 
async function initMap () {
    //calls the map library
    const { Map } = await google.maps.importLibrary("maps");
    //calls the advancedMarker library 
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    //options for the map
    var options = {
        zoom: 8,
        center: {lat:43.39, lng:-79.23},
        mapId: '813a59388c1fe9ed'
    }

    //calls the map-container element in the html
    map = new Map(document.getElementById('map-container'), options);

    /*const marker = new AdvancedMarkerElement({
        map:map,
        position: options.center, 
        title: 'Toronto'
    });*/
}

//function that updates the map when an item is entered into the search bar 
async function updateMap (lat,lon) {
    const { Map } = await google.maps.importLibrary("maps");

    //options for the map
    var options = {
        zoom: 8,
        center: {lat:lat, lng:lon},
        mapId: '813a59388c1fe9ed'
    }

    //calls the map-container element in the html
    map = new Map(document.getElementById('map-container'), options);

    const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
    });
      // Create an array of alphabetical characters used to label the markers.
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      // Add some markers to the map.
    const markers = locations.map((position, i) => {
    const label = labels[i % labels.length];
    const marker = new google.maps.Marker({
          position,
          label,
        });
    
        // markers can only be keyboard focusable when they have click listeners
        // open info window when marker is clicked
    marker.addListener("click", () => {
          infoWindow.setContent(label);
          infoWindow.open(map, marker);
    });
    return marker;
    });
    
      // Add a marker clusterer to manage the markers.
      new MarkerClusterer({ markers, map });

    for (let index = 0; index < array.length; index++) {
        
    }
}



initMap();