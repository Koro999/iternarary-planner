let iteneraryCardId = -1; //changed from 1 to -1
let collectionCardId = -1; //changed from 1 to -1
let collectionCardsNum = 0; //changed from 1 to -1
var iteneraryCardsNum = 0;
var iteneraryNum = 0;
var selectedItenerary;


//will be an object of objects.
//if the user adds an itenerary, a new itenerary property will be created
//if a user adds cards, 
var savedCards = [];

function addCollectionCard(title, description, imgsrc){        
    if(!title || !description)
        return;

    collectionCardsNum++;
    collectionCardId++;
    createCollectionCardElement(title, description, imgsrc);
}

function createCollectionCardElement(title, description, imgsrc) {
    var collectionCardsParent = $(`#cardContainer`);

    var cardContainer = $(`<div class="card column is-3 collectionCardContainer${collectionCardId}"></div>`);
    collectionCardsParent.append(cardContainer);

    var imageContainer = $(`<div class="card-image"></div>`);
    cardContainer.append(imageContainer);

    var figureContainer = $(`<div class="image is-4by3"></div>`);
    imageContainer.append(figureContainer);

    var image = $(`<img class="image" src="${imgsrc}"></div>`);
    figureContainer.append(image);

    var cardContent = $(`<div class="card-content"></div>`);
    cardContainer.append(cardContent);

    var content = $(`<div class="content"></div>`);
    cardContent.append(content);

    var title = $(`<p class="title is-4">${title}</p>`);
    content.append(title);

    var descriptionLabel = $(`<p class="description">${description}</p>`);
    content.append(descriptionLabel);

    let buttonId = collectionCardId;
    var deleteButton = $('<button class="button">Delete</button>');
    deleteButton.on('click', () => deleteCollectionCard(`collectionCardContainer${buttonId}`));
    content.append(deleteButton);
}

function addIteneraryCard(title, content) {
    if(!title || !content)
        return;

    if(iteneraryNum == 0) {//If it is empty we can create one itenerary before doing anything
    
        addItenerary();
    }
    iteneraryCardId++;
    iteneraryCardsNum++;
    createIteneraryCardElement(title, content, changeCollection());
}

function createIteneraryCardElement(title, content, itenerary) {
    var iteneraryCardsParent = $(`#${itenerary}`);
    var cardContainer = $(`<div class="dropdown-content cardContainer${iteneraryCardId}"></div>`);
    iteneraryCardsParent.append(cardContainer);

    var IteneraryCardDiv = $(`<div id="IteneraryCard${iteneraryCardId}" class="dropdown-item IteneraryCardsBtn card is-flex-direction-column"></div>`);
    cardContainer.append(IteneraryCardDiv);

    var cardTitle = $(`<h3 class="title">${title}</h3>`);
    IteneraryCardDiv.append(cardTitle);

    var cardP = $(`<p class="paragraph">${content}</p>`);
    IteneraryCardDiv.append(cardP);

    var buttonContainer = $('<div class="buttons has-addons"></div>');
    IteneraryCardDiv.append(buttonContainer);

    // var editButton = $('<button class="button">Edit</button>');
    // editButton.on('click', () => editCard(`IteneraryCard${iteneraryCardId}`));
    // buttonContainer.append(editButton);

    var deleteButton = $('<button class="button">Delete</button>');
    var myId = iteneraryCardId;
    deleteButton.on('click', () => deleteItineraryCard(`cardContainer${myId}`));
    buttonContainer.append(deleteButton);

    //this search bar has a value of the location name
    //when search button clicked, will call the google map api and wiki api with its value as a parameter
    // var cardSearch = $('<button class="button">Search</button>');
    // cardSearch.on('click', () => deleteCard(card.id));
    // buttonContainer.append(cardSearch);


    //getIteneraryNum(selectedItenerary) is the number of currently selected itenerary.
    //for ex. savedCards[0] will point to the first itenerary object in the savedCards array.
    // savedCards[1] will point to the second itenerary object in the savedCards object.


    var id = `IteneraryCard${iteneraryCardId}`;
    savedCards[getIteneraryNum(selectedItenerary)].children.trigger.children.dropdownMenu.children.dropdownContent.children = {
        [id]: {
            element: IteneraryCardDiv.html(),
            children: {
                cardTitle: {
                    element: cardTitle.html()
                },
                cardP: {
                    element: cardP.html()
                },
                buttonContainer: {
                    element: buttonContainer.html(),
                    children: {
                        // editButton: {
                        //     element: editButton.html()
                        // },
                        deleteButton: {
                            element: deleteButton.html()
                        }
                        // ,
                        // cardSearch: {
                        //     element: cardSearch.html()
                        // }
                    }
                }
            }
        }
    }


    return iteneraryCardsParent;
}

function editCard(iteneraryCardId) {
    const card = document.getElementById(iteneraryCardId);
    const titleElement = card.querySelector('h3');
    const contentElement = card.querySelector('p');

    const newTitle = prompt('Enter a new title:', titleElement.textContent);
    const newContent = prompt('Enter new content:', contentElement.textContent);

    titleElement.textContent = newTitle;
    contentElement.textContent = newContent;
}

function deleteItineraryCard(cardsId) {
    const card = $(`.${cardsId}`);
    card.remove();
    iteneraryCardsNum--;
}

function deleteCollectionCard(cardsId) {
    const card = $(`.${cardsId}`);
    card.remove();
    collectionCardsNum--;
}

function clearCollection() {
    var numberOfElements = collectionCardsNum;
    var children = document.querySelector(`#cardContainer`).children;
    for (let index = numberOfElements-1; index >= 0; index--) {
        console.log(index);
        children[index].remove();
        collectionCardsNum--;
    }
}

function saveCollection() {
    if(collectionCardId < 0)
        return;

    var placename;
    var wikiContent;

    var numberOfElements = collectionCardsNum;
    var children = document.querySelector(`#cardContainer`).children;
    for (let index = numberOfElements-1; index >= 0; index--) {
        placename = children[index].querySelector('.title').innerHTML;
        wikiContent = children[index].querySelector('.description').innerHTML;
        addIteneraryCard(placename, wikiContent);
    }
}



function changeCollection() {
    var collectionSelect = $('#collectionSelect');
    var selectedOption = collectionSelect.find(':selected');

    var val1 = selectedOption.data('value1');
    var val2 = selectedOption.data('value2');


    selectedItenerary = val2;
    getIteneraryNum(selectedItenerary);     //if the val1 of the selected option in Itenerary0Cards, the val2 will pass 0 to getIteneraryNum function
    //this is to accurately select the current itenerary from the savedCards array.
    return val1;
}

var itenerarySearchInput = document.getElementById("itenerarySearchInput");

itenerarySearchInput.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        searchPlace(searchedCity[0].value);
    }
});


function removeItenerary(element)
{
    element.parentElement.parentElement.parentElement.remove();
    decreaseIteneraryNum();
}

//when function is called, another itenerary div will be dynamically added
//the value of an option is the id of the itenerary div

function addItenerary() {

    var collectionSelect = $('#collectionSelect');
    var newOption = $(`<option>Itenerary ${iteneraryNum}</option>`);
    newOption.val(`Itenerary${iteneraryNum}Cards`);
    newOption.data('value1', `Itenerary${iteneraryNum}Cards`);  //newOption's first value is it's id
    newOption.data('value2', iteneraryNum);     //newOption's secopnd value is itenerary number

    selectedItenerary = newOption.data('value2');
    getIteneraryNum(selectedItenerary);
    collectionSelect.append(newOption);



    //creates a new Itenerary div
    var dropdownDiv = $('<div></div>').addClass(`dropdown Itenerary Itenerary${iteneraryNum}`);
    $('aside').append(dropdownDiv);

    var dropdownTriggerDiv = $('<div></div>').addClass('dropdown-trigger');
    dropdownDiv.append(dropdownTriggerDiv);

    var button = $('<button></button>').addClass(`button  Itenerary${iteneraryNum}`);
    dropdownTriggerDiv.append(button);

    var titleSpan = $('<span></span>').attr('id', `Itenerary${iteneraryNum}Title`).text(`Itenerary ${iteneraryNum}`);
    button.append(titleSpan);

    var iconSpan = $('<span></span>').addClass('icon');
    button.append(iconSpan);

    var icon = $('<i></i>').addClass('fas fa-angle-down');
    iconSpan.append(icon);

    var iteneraryDeleteButton = $('<button>Delete</button>').addClass(`button  is-danger is-small deleteButton`).attr("onclick", "removeItenerary(this)");
    button.append(iteneraryDeleteButton);

    var dropdownMenuDiv = $('<div></div>').addClass('dropdown-menu IteneraryCards').attr('id', `Itenerary${iteneraryNum}Cards`);
    dropdownTriggerDiv.append(dropdownMenuDiv);

    var dropdownContentDiv = $('<div></div>').addClass(`dropdown-content cardContainer${iteneraryNum}`);
    dropdownMenuDiv.append(dropdownContentDiv);


    //this stores the whole itenerary html to the savedCards array to be able to save them later.
    var container = {
        element: dropdownDiv.html(),
        children: {
            trigger: {
                element: dropdownTriggerDiv.html(),
                children: {
                    iteneraryBtn: {
                        element: button.html(),
                        children: {
                            spanTitle: {
                                element: titleSpan.html()
                            },
                            spanIcon: {
                                element: iconSpan.html(),
                                children: {
                                    icon: {
                                        element: icon.html()
                                    }
                                }
                            },
                            deleteButton: {
                                element: iteneraryDeleteButton.html()
                            }
                        }
                    },
                    dropdownMenu: {
                        element: dropdownDiv.html(),
                        children: {
                            dropdownContent: {
                                element: dropdownContentDiv.html(),
                                children: {
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    savedCards.push(container);
    addIteneraryNum();

}
//this is for the savedCards array
//
function getIteneraryNum(selectedItenerary) {
    return selectedItenerary;
}
function addIteneraryNum() {
    iteneraryNum++;
}

function decreaseIteneraryNum() {
    iteneraryNum--;
}

//map and API code 

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
    //await pointsOfInterest(lat,lon)
})

var lastPlaceSearched;
//function calls the google geocoder api to grab the lat and lon
window.searchPlace = async function (city) {
    lastPlaceSearched = city;
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
    await pointsOfInterest(lat, lon);
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
            addCardOnPOIClick(place.name);
        });
      }

}

function addCardOnPOIClick(placename)
{
    // TODO - Add call to wikipedia API to get the content for this place
    var wikiContent = lastPlaceSearched + " - "+ placename + "- this content is awesome";

    // TODO - Change imgsrc to whatever we get from the API
    var imgsrc = "https://bulma.io/images/placeholders/1280x960.png";
    addCollectionCard(placename, wikiContent, imgsrc);
    //addIteneraryCard(placename, wikiContent);
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

initMap();


//map and wikipedia generation to card 

