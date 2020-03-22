    
var date = moment().format('dddd, MMMM Do, YYYY');

$("#currentDay").text(date);

var currentHour = getCurrentHour();

var currentHourSelected = false;

var checkForNewHour;

checkForNewHour = setInterval(function() {
    
    var minutes = getCurrentMinutes();
    
    if (minutes <= 1) {
        //reload the page at the top of the hour if textarea is not focused:
       var focus = $("textarea").is(":focus");
        if (!focus) {
            location.reload();
        }
    }
}, 60000);

var tabindex = 1;

$(document).ready(function() {

    refreshCalendar();

    $(".table-info.save.edit").on("click", function() { 
        //save button clicked:
        var elementClass = $(this).attr("class");
        
        if (elementClass === "table-info save edit") {
            //get the textarea box value entered:
            var data = $(this).prev().find("textarea").val();
            //get the time id value:
            var id = $(this).prev().find("textarea").attr("id");
            //save data:
            saveData(data, id);
        }   
    });

    $(".table-info.save.edit").on("keydown", function(event) { 
        //enter button on keyboard clicked when save element is focused:
        if (event.key === "Enter") {
            //get the textarea box value entered:
            var data = $(this).prev().find("textarea").val();
            //get the time id value:
            var id = $(this).prev().find("textarea").attr("id");
            //save data:
            saveData(data, id);
        }
    });

});

function getCurrentHour() { //get the current hour from the current time:
    var time = moment().format('LT'); 
    var colon = time.indexOf(":");
    var hour = time.substring(0, colon);
    var M = time.indexOf("M") + 1;
    var AorP = M - 2;
    var amOrPm = time.substring(AorP, M);
    var currentHour = hour + amOrPm;
    return currentHour;
}

function getCurrentMinutes() { //get current minutes from the current time:
    var time = moment().format('LT'); 
    var colon = time.indexOf(":");
    var minutes = time.substring(colon + 1, colon + 3);
    var minsNum = parseInt(minutes);
    return minsNum;
}

function refreshCalendar() {

    $(".table.table-hover tbody tr").each(function(index) {

        var tRow = $(this);
        var trVal = $(this).attr("value");

        if (trVal === currentHour) {
            //current hour block
            $(tRow).children(".event").addClass("table-warning")
            .html('<textarea id="' + trVal + '" disabled="disabled"></textarea>');
            $(tRow).children(".save").addClass("disabled");
            currentHourSelected = true;
        }
        else if (currentHourSelected === false) {  
            //past hour block
            $(tRow).children(".event").addClass("table-secondary")
            .html('<textarea id="' + trVal + '" disabled="disabled"></textarea>');
            $(tRow).children(".save").addClass("disabled");
        }
        else {
            //future hour block
            $(tRow).children(".event").addClass("table-success")
            .html('<textarea id="' + trVal + '" placeholder="Enter an event name and details" tabindex="' + tabindex + '"></textarea>');
            tabindex++;
            $(tRow).children(".save").addClass("edit").attr("tabindex", tabindex);
        }

        updateData(trVal);

    });

}

function updateData(id) {

    var event = getData(id);

    //if an event exists in the time block, add it:
    if (event !== null) {
        $("#" + id).val(event);
    }

}

function saveData(data, id) {
    //get the id of the textarea box:
    $(this).prev().find("textarea").val(eventText).attr("id", id);

    //sanitize the data by removing certain special characters:
    var eventText = removeSpecialChars(data).trim();

    if (eventText !== "") {
        //if the textarea box is not empty, save it to local storage:
        setData(id, eventText);
        updateData(id);
    }
    else {
        //if textarea box is empty, remove the data from local storage:
        removeData(id);
        updateData(id);
    }
    //Alert the user that the event was saved to local storage:
    alert("Event Saved!");

}

function removeSpecialChars(data) {

    var specialCharacters = ['"', '&', '\\', '<', '>', '[', ']', '{', '}', '+', '-', '/', '*'];
    var strArray = data.split("");

    //loop through each of the special characters and compare it to the data string entered,
    //remove all character matches and return the new data string:
    $.each(specialCharacters, function(index, character) {
        $.each(strArray, function(index, value) {
            if (value === character) {
                data = data.replace(value, "");
            }
        });
    });
    
    return data;
}

function setData(id, data) { //set local storage data
    window.localStorage.setItem(id, data);
}

function getData(id) { //get local storage data
    return window.localStorage.getItem(id);
}

function removeData(id) { //remove local storage data
    window.localStorage.removeItem(id);
}