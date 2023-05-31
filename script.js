// Working search bar, that interacts with the google API (Carlos)
// -location is picked. and information can be pulled
var searchedCity = $('.input');
var screenMap = $('#map-container');
var carlosKey = 'AIzaSyBfijwlDdGDJ2LiGaA6IL5b1wOf0a1PPsE';


function searchPlace(city) {
    console.log(city);
    var geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${carlosKey}&address=${city}`;
fetch(geocodeApiUrl)
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
})
}


$('.search').on('click', () => {
    searchPlace(searchedCity[0].value);
})


$(document).ready(function() {

    // Assigns an on click event to the dropdown button
    $(document).on('click', '.Itenerary .dropdown-trigger button', function(event) {
        event.stopPropagation();

        var allActiveIteneraries = $(".Itenerary.is-active");   // stores all active Itenerary elements in variable
        var currentItenerary = $(this).closest('.Itenerary');   // goes through clicked element's parents that matches 'Itenerary'

        // Remove 'is-active' class from all active Iteneraries that aren't the current one]
        allActiveIteneraries.each(function() {  //.each() loops all active itenerary queries
            if (!$(this).is(currentItenerary)) {    // checks if if the 'currentItenerary' is not the same as the element in current iteration
                $(this).removeClass('is-active');
            }
        });

        currentItenerary.toggleClass('is-active'); // Toggle the current dropdown
    });
});



