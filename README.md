This is a daily planner that gives the user the ability to enter and save events to an online
calendar for the current day from 8am until 6pm. The application is put together using
HTML5, CSS, Bootstrap, Moment.js, and JQuery. 

The application is initially created by first accessing the current date by utilizing the Moment.js
library code and then displays it at the top of the screen. Then it loops through an Html5 table created using Bootstrap classes, and color-codes each table row based on the current time. A gray colored row indicates a time in the past, the yellow indicates the current hour, and the green indicates a future time that the user is able to edit and submit a new event within the time block.The current time is accessed once again by utilizing Moment.js within the getCurrentHour() function. This function returns the current hour by extracting it from the current time string.

The getCurrentMinutes is called every minute to see if the current time has reached the top of the
hour, in which case the application will refresh, as long as the user is not actively editing one
of the time blocks on the calendar. At the end of the initial calendar set up, the updateData function is called which then adds all of the pre-existing events that were saved in local storage into each applicable time block textarea box. 

The user can save the text they entered by either clicking the save button on the far-right side of the calendar, or by tabbing into it and pressing the enter button on the keyboard. Both these events trigger a JQuery function which retrieves the id of the row to be saved, and extracts the value. These two values are then sent to the saveData() function which then passes the data to the removeSpecialChars() function which then sanitizes the data by removing any tags that can be used to enter malicious code. This function returns the data with those special characters removed.

After the code has been sanitized, the saveData() function then checks whether the textarea box next to the save button that was clicked is empty, in which case, the id of the local storage data is passed to the removeData() function and that item in local storage is removed. If the textarea box is not empty, the data is added to local storage by passing the id and value to the setData() function. Finally, after the data is successfully saved and add to the calendar, an alert box is displayed notifying the user that the text they entered was saved.