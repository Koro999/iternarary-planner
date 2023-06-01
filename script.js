// Working search bar, that interacts with the google API (Carlos)
// -location is picked. and information can be pulled
var searchedCity = $('.input');
var screenMap = $('#map-container');
var carlosKey = 'AIzaSyBfijwlDdGDJ2LiGaA6IL5b1wOf0a1PPsE';

var map;
var service;

window.searchPlace = function (city) {
    var geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${carlosKey}&address=${city}`;    //api url to search for a location's latlng
    var placeLat;
    var placeLon;

    fetch(geocodeApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status} occurred while fetching data.`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'OK') { //only if the input is a valid location address, its latitude and longitude will be stored in variable
                placeLat = data.results[0].geometry.location.lat;
                placeLon = data.results[0].geometry.location.lng;
                var cityLatLng = new google.maps.LatLng(placeLat, placeLon);

                map = new google.maps.Map(document.getElementById('map-container'), { center: cityLatLng, zoom: 15 });    //creates a new Map object, and displayed in #map-container in html

                var request = {
                    location: cityLatLng,
                    radius: '500',     //radius of location in m
                    types: ['tourist_attraction'] //enter a specified type of location. visit https://developers.google.com/maps/documentation/javascript/supported_types to see a list of supported place types.
                };
                service = new google.maps.places.PlacesService(map);    //  creates a new instance of the PlacesService object provided by the Google Maps Places library, and associating it with the map
                service.nearbySearch(request, callback);    // calls 'nearbySearch' method on the 'PlacesService' instance
            }
        })
        .catch(error => console.error(error));
};

function callback(results, status) {

    //If the status of the Places API request is OK, it logs the name of each place in the console. If the status is not OK, it logs a message saying that no results were returned.
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            console.log(place.name);
        }
    } else {
        console.log('Place search did not return any results.');
    }
}

$('.search').on('click', () => {
    searchPlace(searchedCity[0].value);
})


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


// Function to handle the edit action for a card
function handleEditCard(event) {
  // Get the card element
  const cardElement = event.target.closest('.card');

  // Perform the edit action
  // For example, you can enable editing of the card's content
}

// Function to handle the delete action for a card
function handleDeleteCard(event) {
  // Get the card element
  const cardElement = event.target.closest('.card');

  // Perform the delete action
  // For example, you can remove the card from the collection
  cardElement.remove();
}

// Function to handle the save action for the current collection of cards
function handleSaveCollection() {
  // Get the collection of cards
  const cardCollection = document.querySelectorAll('.card');

  // Perform the save action
  // For example, you can store the card data in a database or local storage
}

// Function to handle navigation between sets of cards
function handleNavigation(event) {
  // Get the navigation button element
  const navigationButton = event.target;

  // Get the target set of cards based on the button's data attribute
  const targetSet = navigationButton.dataset.targetSet;

  // Perform the navigation action
  // For example, you can hide/show the corresponding set of cards
  const cardSets = document.querySelectorAll('.card-set');
  cardSets.forEach((cardSet) => {
      cardSet.classList.toggle('hidden', cardSet.id !== targetSet);
  });
}

// Add event listeners to the "Edit" buttons
const editButtons = document.querySelectorAll('.edit-button');
editButtons.forEach((editButton) => {
  editButton.addEventListener('click', handleEditCard);
});

// Add event listeners to the "Delete" buttons
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener('click', handleDeleteCard);
});

// Add event listener to the "Save Collection" button
const saveButton = document.querySelector('.save-button');
saveButton.addEventListener('click', handleSaveCollection);

// Add event listeners to the navigation buttons
const navigationButtons = document.querySelectorAll('.navigation-button');
navigationButtons.forEach((navigationButton) => {
  navigationButton.addEventListener('click', handleNavigation);
});
