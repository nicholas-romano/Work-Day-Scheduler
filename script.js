$( document ).ready(function() {
    
    var date = moment().format('dddd, MMMM Do, YYYY');

    $("#currentDay").text(date);

    var time = moment().format('LT'); 

    console.log(time);

    var colon = time.indexOf(":");

    var hour = time.substring(0, colon);

    console.log("hour: ", hour);

    var M = time.indexOf("M") + 1;

    var A = M - 2;

    var amOrPm = time.substring(A, M);

    var oClock = hour + amOrPm;

    console.log("hour: " + oClock);

    var currentHourSelected = false;

    $(".table.table-hover tbody tr").each(function(index) {
        var trVal = $(this).attr("value");
        console.log(index);

        if (trVal === oClock) {
            console.log("The top of the current hour is: " + trVal);
            $(this).children(".event").addClass("table-warning");
            currentHourSelected = true;
        }
        else if (currentHourSelected === false) {  
            $(this).children(".event").addClass("table-secondary");
        }
        else {
            $(this).children(".event").addClass("table-success")
            .append('<textarea id="' + oClock + '" placeholder="Enter an event name and details"></textarea>');
        }

    });

});

