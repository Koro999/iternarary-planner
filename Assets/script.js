// Working search bar, that interacts with the google API (Carlos)
// -location is picked. and information can be pulled
var searchedCity = $('.input'); //listener for the form 
var screenMap = $('#map-container');
var Key = 'AIzaSyBXBCuWudNwESA8LytkWrXJ4DQMYvpIWiY';

//google map api variables 
var map;
var service;
var infoWindow;

//map variables 
//lat lons originally start with no value 
var lat;
var lon;
var poiArray;

//event listener for the search button 
//you NEED to use async/await here to have the desired order of operations, otherwise everything executes in the wrong order 
$('.search').on('click', async () => {
    //searchPlace function called, form input is entered
    await searchPlace(searchedCity[0].value);
    await pointsOfInterest(lat, lon)
    //await pointsOfInterest(lat,lon)
})


//function calls the google geocoder api to grab the lat and lon
window.searchPlace = async function (city) {
    //api url to search for a location's lat lng
    var geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${Key}&address=${city}`;    
    //calls the google geocoding api to grab lat lon of location searched 
    const response = await fetch(geocodeApiUrl)
    if (!response.ok) {
        throw new Error(`HTTP status ${response.status} occurred while fetching data.`);
    }
    const data = await response.json();
    if (data.status === 'OK') { //only if the input is a valid location address, its latitude and longitude will be stored in variable
                
        //assigns lat and lon values
        lat = data.results[0].geometry.location.lat;
        lon = data.results[0].geometry.location.lng;
        //console.log(data.status)
        //console.log(lat)//these are defined
        //console.log(lon)//these are defined
        
    }
};

//generate points of interest at the location entered in search bar 
async function pointsOfInterest(lat,lon){
    var cityLatLng = new google.maps.LatLng(lat, lon);
    //this syntax loads libraries as you need them https://developers.google.com/maps/documentation/javascript/libraries
    const { places } = await google.maps.importLibrary("places")
    infoWindow = new google.maps.InfoWindow();
    //sets the map element with the latlng grabbed from the geocoder api 
    map = new google.maps.Map(document.getElementById('map-container'), { center: cityLatLng, zoom: 16 });   

    var request = {
        location: cityLatLng,
        radius: '500', //radius of location in m
        types: ['tourist_attraction'] //enter a specified type of location. visit https://developers.google.com/maps/documentation/javascript/supported_types to see a list of supported place types.
    };
    //console.log('trainStart')
    service = new google.maps.places.PlacesService(map);    //  creates a new instance of the PlacesService object provided by the Google Maps Places library, and associating it with the map
    //WHY IS THIS FUNCTION SPECIFICALLY ACTIVATING AFTER
    //the 2nd parameter is the callback
    //callback will finish whenever the api finishes returning information
    //everything that needs to be done with the callback information must be done within the callback function
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            poiArray = results; 
        //loop through the array 
            for (let i = 0; i < results.length; i++) {
                //console.log all the locations
                place = results[i]
                console.log(place.name)

                createMarker(results[i]);
            }
        } else {
            console.log('Place search did not return any results.');
        }
    })

    //function creates all the markers of the points of interest into map
    function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;
      
        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
        });

        //when the marker is hovered over it should show the name of the location and stuff
        google.maps.event.addListener(marker, "mouseover", () => {
            //set the content of the information
            infoWindow.setContent(place.name || "");
            infoWindow.open(map, marker);
        });

        //when the marker is clicked it should save to itinerary
        google.maps.event.addListener(marker, "click", () => {
            
        });
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
/*
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
}*/



initMap();