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



