// var searchForm = document.querySelector('#search-form') //Getting Variables From HTML Page
// var qInput = document.querySelector('#q');
// var videosList = document.getElementById('videos');
// var wikipediaDiv = document.getElementById('wikipediaDiv');
// var wikiResults = document.getElementById('wiki-results');

// var wikiHandleSearch = function (event) { //Function to fetch from WikiPedia
//     event.preventDefault(); //Prevents page from resetting on submission

//     var q = qInput.value.trim(); //Turns user search input into variable "q"

//     if (!q) {
//         return;
//     }

//     var baseURL = 'https://en.wikipedia.org/w/api.php?origin=*&action=';
//     var apiURL = baseURL + 'opensearch&search=' + q + '&limit=8&namespace=0&format=json';

//     fetch(apiURL)
//         .then(function (response) {
//             return response.json();

//         })
//         .then(function (data) { //Iterates through data and appends Wikipedia URLs onto page
//             // console.log(data)
//             var results = data[1];
//             var links = data[3];
//             var html = '<ul>';

//             for (var i = 0; i < results.length; i++) {
//                 html += `<li><a href="${links[i]}" target="_blank">${results[i]}</a></li>`;
//             }
//             html += '</ul>';
//             wikiResults.innerHTML = html;

//             localStorage.setItem('wikiResultsData', JSON.stringify(data)); //Sets wiki local storage
//         })
//         .catch(function (err) { //Catching and console logging errors
//             console.log(err);
//         });
// };

// searchForm.addEventListener('submit', wikiHandleSearch); //Event listener for submission button

// var bingOptions = { //Sets Bing API Key and Host
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '168a4d3a4cmsh9a1eadacaa150cap199683jsn69b0a6c3e172',
//         'X-RapidAPI-Host': 'bing-video-search1.p.rapidapi.com'
//     }
// };

// searchForm.addEventListener('submit', function (event) { //Function for Bing Videos
//     event.preventDefault(); //Prevents page from resetting on submission

//     var q = qInput.value.trim(); //Takes user search input and makes into a variable trimming off whitespace

//     fetch(`https://bing-video-search1.p.rapidapi.com/videos/search?count=3&q=${q}`, bingOptions) //Fetches Bing with search input as "q"
//         .then(response => response.json())
//         .then(response => {
//             // console.log(response)
//             videosList.innerHTML = '';
//             var videos = response.value;

//             for (var i = 0; i < videos.length; i++) { // Iterating through data to display video and video title as clickable links
//                 var video = videos[i];
//                 var li = document.createElement('li');

//                 li.innerHTML = `<div><a href="${video.contentUrl}" target="_blank"><h3>${video.name}</h3></a></div> 
//                 <div><a href="${video.contentUrl}" target="_blank"><img src="${video.thumbnailUrl}" alt="${video.name}"></a></div>`;

//                 videosList.appendChild(li);
//             }

//             localStorage.setItem('bingVideosData', JSON.stringify(response)); //Sets local storage for Bing
//         })
//         .catch(err => console.error(err));
// });

// var bingData = localStorage.getItem('bingVideosData'); //Gets local storage for Bing

// if (bingData) {
//     var data = JSON.parse(bingData);
//     var videos = data.value;
//     videosList.innerHTML = '';

//     for (var i = 0; i < videos.length; i++) { //Reappends data to page on refresh using local storage
//         var video = videos[i]; 
//         var li = document.createElement('li');
//         li.innerHTML = `<div><a href="${video.contentUrl}" target="_blank"><h3>${video.name}</h3></a></div> 
//         <div><a href="${video.contentUrl}" target="_blank"><img src="${video.thumbnailUrl}" alt="${video.name}"></a></div>`;
//         videosList.appendChild(li);
//     }
// }

// var wikiData = localStorage.getItem('wikiResultsData'); //Gets local storage for Wiki

// if (wikiData) {
//     var data = JSON.parse(wikiData);
//     var results = data[1];
//     var links = data[3];
//     var html = '<ul>';

//     for (var i = 0; i < results.length; i++) {  //Reappends data to page on refresh using local storage
//         html += `<li><a href="${links[i]}" target="_blank">${results[i]}</a></li>`;
//     }

//     html += '</ul>';
//     wikiResults.innerHTML = html;
// }











let currentCollection = 1;
let cardId = -1; //changed from 1 to -1
var IteneraryNum = 0;
var selectedItenerary;


var savedItinerary = [];

//will be an object of objects.
//if the user adds an itenerary, a new itenerary property will be created
//if a user adds cards, 
var savedCards = []
//an object that stores all the itenerary html
var iteneraryHTML = {}

function addCard() {
    cardId++;
    const title = document.getElementById('cardTitleInput').value;
    const content = document.getElementById('cardContentInput').value;

    createCardElement(title, content, changeCollection());
    document.getElementById('cardTitleInput').value = '';
    document.getElementById('cardContentInput').value = '';


}

var dropdownContent;
function createCardElement(title, content, itenerary) {
    var iteneraryCardsParent = $(`#${itenerary}`);




    dropdownContent = $(`<div class="dropdown-content cardContainer${cardId} hello"></div>`);
    iteneraryCardsParent.append(dropdownContent);

    var IteneraryCardDiv = $(`<div id="IteneraryCard${cardId}" class="dropdown-item IteneraryCardsBtn card is-flex-direction-column"></div>`);
    dropdownContent.append(IteneraryCardDiv);

    var cardTitle = $(`<h3 class="title">${title}</h3>`);
    IteneraryCardDiv.append(cardTitle);

    var cardP = $(`<p class="paragraph">${content}</p>`);
    IteneraryCardDiv.append(cardP);

    var buttonContainer = $('<div class="buttons has-addons"></div>');
    IteneraryCardDiv.append(buttonContainer);

    var editButton = $('<button class="button">Edit</button>');
    editButton.on('click', () => editCard(`IteneraryCard${cardId}`));
    buttonContainer.append(editButton);

    var deleteButton = $('<button class="button">Delete</button>');
    deleteButton.on('click', () => deleteCard(`cardContainer${cardId}`));
    buttonContainer.append(deleteButton);

    //this search bar has a value of the location name
    //when search button clicked, will call the google map api and wiki api with its value as a parameter
    var cardSearch = $('<button class="button">Search</button>');
    // cardSearch.on('click', () => deleteCard(card.id));
    buttonContainer.append(cardSearch);

    // stores each element's html to object
    iteneraryHTML[`dropdownContent`] = dropdownContent;
    iteneraryHTML[`IteneraryCardDiv`] = IteneraryCardDiv;
    iteneraryHTML[`cardTitle`] = cardTitle;
    iteneraryHTML[`cardP`] = cardP;
    iteneraryHTML[`buttonContainer`] = buttonContainer;
    iteneraryHTML[`editButton`] = editButton;
    iteneraryHTML[`deleteButton`] = deleteButton;
    iteneraryHTML[`cardSearch`] = cardSearch;

    addItenerarytoArray();
    return iteneraryCardsParent;
}

function setCardsHtml() {

}

function getCardsHtml(iteneraryCardsParent) {
    return iteneraryCardsParent;
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

function deleteCard(cardsId) {
    const card = $(`.${cardsId}`);
    card.remove();
    cardId--;
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

//when function is called, another itenerary div will be dynamically added
//the value of an option is the id of the itenerary div

function addItenerary() {

    var collectionSelect = $('#collectionSelect');
    var newOption = $(`<option>Itenerary ${IteneraryNum}</option>`);
    newOption.val(`Itenerary${IteneraryNum}Cards`);
    newOption.data('value1', `Itenerary${IteneraryNum}Cards`);  //newOption's first value is it's id
    newOption.data('value2', IteneraryNum);     //newOption's secopnd value is itenerary number

    selectedItenerary = newOption.data('value2');
    getIteneraryNum(selectedItenerary);
    collectionSelect.append(newOption);



    //creates a new Itenerary div
    var dropdownDiv = $('<div></div>').addClass(`dropdown Itenerary Itenerary${IteneraryNum}`);
    $('aside').append(dropdownDiv);

    var dropdownTriggerDiv = $('<div></div>').addClass('dropdown-trigger');
    dropdownDiv.append(dropdownTriggerDiv);

    var button = $('<button></button>').addClass(`button  Itenerary${IteneraryNum}`);
    dropdownTriggerDiv.append(button);

    var titleSpan = $('<span></span>').attr('id', `Itenerary${IteneraryNum}Title`).text(`Itenerary ${IteneraryNum}`);
    button.append(titleSpan);

    var iconSpan = $('<span></span>').addClass('icon');
    button.append(iconSpan);

    var icon = $('<i></i>').addClass('fas fa-angle-down');
    iconSpan.append(icon);

    var dropdownMenuDiv = $('<div></div>').addClass('dropdown-menu IteneraryCards').attr('id', `Itenerary${IteneraryNum}Cards`);
    dropdownTriggerDiv.append(dropdownMenuDiv);

     var dropdownContent = $(`<div class="dropdown-content cardContainer${cardId} hello"></div>`);
    dropdownMenuDiv.append(dropdownContent);

    iteneraryHTML[`dropdownDiv`] = dropdownDiv;
    iteneraryHTML[`dropdownTriggerDiv`] = dropdownTriggerDiv;
    iteneraryHTML[`button`] = button;
    iteneraryHTML[`titleSpan`] = titleSpan;
    iteneraryHTML[`iconSpan`] = iconSpan;
    iteneraryHTML[`icon`] = icon;
    iteneraryHTML[`dropdownMenuDiv`] = dropdownMenuDiv;

    saveItinerary();
    addIteneraryNum();
}

function saveItinerary() {
    var container = {
        element: iteneraryHTML.dropdownDiv.html(),
        children: {
            trigger: {
                element: iteneraryHTML.dropdownTriggerDiv.html(),
                children: {
                    iteneraryBtn: {
                        element: iteneraryHTML.button.html(),
                        children: {
                            spanTitle: {
                                element: iteneraryHTML.titleSpan.html()
                            },
                            spanIcon: {
                                element: iteneraryHTML.iconSpan.html(),
                                children: {
                                    icon: {
                                        element: iteneraryHTML.icon.html()
                                    }
                                }
                            }
                        }
                    },
                    dropdownMenu: {
                        element: iteneraryHTML.dropdownMenuDiv.html(),
                        children: {
                            dropdownContent: {
                            }
                        }
                    }
                }
            }
        }
    }
    savedItinerary.push(container);

}




function addItenerarytoArray() {
    //this stores the whole itenerary html to the savedCards array to be able to save them later.

    console.log(iteneraryHTML);
    var container = {

        [`IteneraryCard${cardId}`]: {
            element: iteneraryHTML.IteneraryCardDiv.html(),
            children: {
                cardTitle: {
                    element: iteneraryHTML.cardTitle.html()
                },
                cardP: {
                    element: iteneraryHTML.cardP.html()
                },
                buttonContainer: {
                    element: iteneraryHTML.buttonContainer.html(),
                    children: {
                        editButton: {
                            element: iteneraryHTML.editButton.html()
                        },
                        deleteButton: {
                            element: iteneraryHTML.deleteButton.html()
                        },
                        cardSearch: {
                            element: iteneraryHTML.cardSearch.html()
                        }
                    }
                }
            }
        }
    };

    savedCards.push(container);
}



//this is for the savedCards array
//
function getIteneraryNum(selectedItenerary) {
    return selectedItenerary;
}
function addIteneraryNum() {
    IteneraryNum++;

}

function saveCollection() {

    var itineraryData = savedItinerary;
    localStorage.setItem('itenerary', JSON.stringify(itineraryData));

    var cardsData = savedCards;
    localStorage.setItem('cards', JSON.stringify(cardsData));

    renderSaved();
}

function renderSaved() {
    //will display all the cards from the local storage
    var storedcardsData = JSON.parse(localStorage.getItem('cards'));
    var storeditineraryData = JSON.parse(localStorage.getItem('itenerary'));


    if (storeditineraryData !== null) {
        // console.log(storedData);
        for (var a = 0; a < storeditineraryData.length; a++) {
            var aside = $('aside');

            var itineraryContainer = storeditineraryData[a].element;
            
            aside.append(itineraryContainer);

            for (var b = 0; b < storedcardsData.length; b++) {
                var dropdownMenu = storeditineraryData[a].children.trigger.children.dropdownMenu.children.dropdownContent;
                dropdownMenu[`children`] = storedcardsData[b];
                dropdownMenu[`element`] = 
                console.log(storeditineraryData[a].children.trigger.children.dropdownMenu);
                // console.log(storedcardsData);
                
            }


        }
    }



    // asideContainer.append(iteneraryHtml)
    // console.log(asideContainer);


}
renderSaved();
















// Working search bar, that interacts with the google API (Carlos)
// -location is picked. and information can be pulled
var searchedCity = $('.input'); //listener for the form 
var screenMap = $('#map-container');
var Key = 'AIzaSyBXBCuWudNwESA8LytkWrXJ4DQMYvpIWiY';

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


    }
};

//generate points of interest at the location entered in search bar 
async function pointsOfInterest(lat, lon) {
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

    function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;

        const marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
        });

        google.maps.event.addListener(marker, "click", () => {
            infoWindow.setContent(place.name || "");
            infoWindow.open(map, marker);
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
async function initMap() {
    //calls the map library
    const { Map } = await google.maps.importLibrary("maps");
    //calls the advancedMarker library 
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    //options for the map
    var options = {
        zoom: 8,
        center: { lat: 43.39, lng: -79.23 },
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
async function updateMap(lat, lon) {
    const { Map } = await google.maps.importLibrary("maps");

    //options for the map
    var options = {
        zoom: 8,
        center: { lat: lat, lng: lon },
        mapId: '813a59388c1fe9ed'
    }

    //calls the map-container element in the html
    map = new Map(document.getElementById('map-container'), options);


}



initMap();
