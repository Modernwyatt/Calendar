let workDay = {
    "0800hrs": "",
    "0900hrs": "",
    "1000hrs": "",
    "1100hrs": "",
    "1200hrs": "",
    "1300hrs": "",
    "1400hrs": "",
    "1500hrs": "",
    "1600hrs": "",
    "1700hrs": "",
};

$(document).ready(function(){
    if(!localStorage.getItem('workDay')){
        updateCalendarTasks(workDay);
    } else {
      updateCalendarTasks(JSON.parse(localStorage.getItem('workDay')));
}
})

$('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMM Do YYYY, HH:mm:ss '));

let counter = 1;
for(const property in workDay){
    let textEntry = "#text-entry" + counter;
    $(textEntry).text(workDay[property]);
    let timeId = "#time" + counter;
    let presentHour= moment().hour();
    let timeString = $(timeId).text();
    let timeNumber = (timeString);
    // console.log(timeString)
    // console.log(presentHour)
    // console.log("timenumber", timeNumber)
    // console.log(hourNumberFromHourString(timeNumber))
   
    for (let i=1; i<10; i++){
        if (timeNumber < presentHour){
            $("#text-entry" + i).addClass("past-hour");
        } else if (timeNumber > presentHour){
            $("#text-entry" + i).addClass("future-hour");
        } else {
            $("#text-entry" + i).addClass("present-hour");
        } 
    }
    counter ++;
}

$("button").click(function(){
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();

  saveSchedule(hourString, value);
});

function hourNumberFromHourString(hourString){
    switch(hourString){
        case "0800hrs": return 8;
        case "0900hrs": return 9;
        case "1000hrs": return 10;
        case "1100hrs": return 11;
        case "1200hrs": return 12;
        case "1300hrs": return 13;
        case "1400hrs": return 14;
        case "1500hrs": return 15;
        case "1600hrs": return 16;
        case "1700hrs": return 17;
    }
}

function loadCorrectDataset() {
    result = localStorage.getItem('workDay')
    return (result ? result : workDay);
}

function initializeLocalStorage() {
    localStorage.setItem('workDay',JSON.stringify(workDay));
}

function saveToLocalStorage(dayObj) {
    localStorage.setItem('workDay',JSON.stringify(dayObj));
}

function saveSchedule(hourString, val) {
    if (!localStorage.getItem('workDay')) {
        initializeLocalStorage();
    }

let workHours = JSON.parse(localStorage.getItem('workDay'));
workHours[hourString] = val

saveToLocalStorage(workHours);
}

function updateCalendarTasks(dayObject) {
  $(".calendar-row").each(function(index){
    let res = $(this).children("div");
    $(this).children("textarea").text(dayObject[res.text()]);
    })
}