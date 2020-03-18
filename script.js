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
    var events = getData();
    var eventsLength = Object.keys(events).length;

    $(".table.table-hover tbody tr").each(function(index) {
        var trVal = $(this).attr("value");

        if (trVal === oClock) {
            //current hour block
            $(this).children(".event").addClass("table-warning")
            .append('<textarea id="' + trVal + '" disabled="disabled"></textarea>');
            currentHourSelected = true;
        }
        else if (currentHourSelected === false) {  
            //past hour block
            $(this).children(".event").addClass("table-secondary")
            .append('<textarea id="' + trVal + '" disabled="disabled"></textarea>');
            $(this).children(".save").addClass("disabled");
        }
        else {
            //future hour block
            $(this).children(".event").addClass("table-success")
            .append('<textarea id="' + trVal + '" placeholder="Enter an event name and details"></textarea>');
        }

        if (eventsLength > 0) {
            $.each(events, function(index, event) {
                if (trVal === index) {
                    console.log("Event at: " + trVal + " " + event);
                    $("#" + trVal).val(event);
                }
            });
        }


    });

    $(".table-info.save").on("click", function() {
        var elementClass = $(this).attr("class");
        
        if (elementClass === "table-info save") {
            //save data:
            var data = $(this).prev().find("textarea").val();
            var id = $(this).prev().find("textarea").attr("id");

            eventText = convertToPlainText(data);

            $(this).prev().find("textarea").val(eventText).attr("id", id);

            var events = getData();

            if (events === null) {
                var eventsData = {};
                eventsData[id] = eventText;
                setData(eventsData);
            }
            else {
                events[id] = eventText;
                setData(events);
            }

            
        }   
    });

});

function convertToPlainText(data) {

    var specialCharacters = ['"', '&', '\\', '<', '>', '[', ']', '{', '}', '+', '-', '/', '*'];
    var strArray = data.split("");

    $.each(specialCharacters, function(index, character) {
        $.each(strArray, function(index, value) {
            if (value === character) {
                data = data.replace(value, character);
            }
        });
    });
    
    return data;
}

function setData(data) { //set local storage data
    localStorage.setItem("events", JSON.stringify(data));
}

function getData() { //get local storage data
    return JSON.parse(localStorage.getItem("events"));
}

