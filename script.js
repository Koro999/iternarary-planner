
let currentCollection = 1;
let cardId = 1;

function addCard() {
  const title = document.getElementById('cardTitleInput').value;
  const content = document.getElementById('cardContentInput').value;

  const card = createCardElement(title, content);

  const cardContainer = document.getElementById('cardContainer');
  cardContainer.appendChild(card);

  document.getElementById('cardTitleInput').value = '';
  document.getElementById('cardContentInput').value = '';

  cardId++;
}

function createCardElement(title, content) {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `card-${cardId}`;

  const titleElement = document.createElement('h3');
  titleElement.textContent = title;

  const contentElement = document.createElement('p');
  contentElement.textContent = content;

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = () => editCard(card.id);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteCard(card.id);

  card.appendChild(titleElement);
  card.appendChild(contentElement);
  card.appendChild(editButton);
  card.appendChild(deleteButton);

  return card;
}

function editCard(cardId) {
  const card = document.getElementById(cardId);
  const titleElement = card.querySelector('h3');
  const contentElement = card.querySelector('p');

  const newTitle = prompt('Enter a new title:', titleElement.textContent);
  const newContent = prompt('Enter new content:', contentElement.textContent);

  titleElement.textContent = newTitle;
  contentElement.textContent = newContent;
}

function deleteCard(cardId) {
  const card = document.getElementById(cardId);
  card.remove();
}

function saveCollection() {
  const collectionSelect = document.getElementById('collectionSelect');
  const selectedCollection = collectionSelect.value;

  // Code to save the collection goes here...
  alert(`Collection ${selectedCollection} saved!`);
}

function changeCollection() {
  const collectionSelect = document.getElementById('collectionSelect');
  const selectedCollection = collectionSelect.value;

  // Code to switch to the selected collection goes here...
  alert(`Switched to Collection ${selectedCollection}!`);
}

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

        connectPlacetoWikiandBing(results[5].name);
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            console.log(place.name);
            //these places will be added to the google map as a marker
        }
    } else {
        console.log('Place search did not return any results.');
    }
}
//refer to comment on line 50.
//once markers have been added to the map, an on click function will be created for each marker
//if a marker is clicked, the location will be passed to connectPlacetoWikipedia(place), and a card will be created for that place
//if one of those cards are clicked, they will also pass the location to connectPlacetoWikipedia(place)
function connectPlacetoWikiandBing(place) {

    wikiHandleSearch(place);
    bingVideos(place);

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



