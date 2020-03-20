    
var date = moment().format('dddd, MMMM Do, YYYY');

$("#currentDay").text(date);

var currentHour = getCurrentHour();

var currentHourSelected = false;

var checkForNewHour;

checkForNewHour = setInterval(function() {
    var time = moment().format('LT'); 
    var colon = time.indexOf(":");
    var minutes = time.substring(colon + 1, colon + 3);
    var minsNum = parseInt(minutes);
    
    if (minsNum <= 1) {
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
        var elementClass = $(this).attr("class");
        
        if (elementClass === "table-info save edit") {
            var data = $(this).prev().find("textarea").val();
            var id = $(this).prev().find("textarea").attr("id");
            //save data:
            saveData(data, id);
        }   
    });

    $(".table-info.save.edit").on("keydown", function(event) {
        if (event.key === "Enter") {
            var data = $(this).prev().find("textarea").val();
            var id = $(this).prev().find("textarea").attr("id");
            //save data:
            saveData(data, id);
        }
    });

});

function getCurrentHour() {
    var time = moment().format('LT'); 
    var colon = time.indexOf(":");
    var hour = time.substring(0, colon);
    var M = time.indexOf("M") + 1;
    var AorP = M - 2;
    var amOrPm = time.substring(AorP, M);
    var currentHour = hour + amOrPm;
    return currentHour;
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
    
    if (event !== null) {
        $("#" + id).val(event);
    }

}

function saveData(data, id) {

    $(this).prev().find("textarea").val(eventText).attr("id", id);

    var eventText = removeSpecialChars(data).trim();

    if (eventText !== "") {
        setData(id, eventText);
        updateData(id);
    }
    else {
        removeData(id);
        updateData(id);
    }
    alert("Event Saved!");

}

function removeSpecialChars(data) {

    var specialCharacters = ['"', '&', '\\', '<', '>', '[', ']', '{', '}', '+', '-', '/', '*'];
    var strArray = data.split("");

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