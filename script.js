$( document ).ready(function() {
    
    var date = moment().format('dddd, MMMM Do, YYYY');

    $("#currentDay").text(date);

    var time = moment().format('LT'); 

});

