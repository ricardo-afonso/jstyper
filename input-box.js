$(document).ready(function() {

    $('#cmd').keypress(function(event) {
        //console.log(event);
        if (event.keyCode === 13) {
            console.log('Getting value from input box:');
            console.log($('#cmd').val());
        }
    });

});
