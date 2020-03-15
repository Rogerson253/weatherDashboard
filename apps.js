// Variable for current date
var today = moment().format("dddd, MMMM Do YYYY");

// API Key
var authKey = "68d666b75db062eebadc3796248de346"

// Empty variable for user input
var queryTerm = "";

// Basic URL for weather
var queryURLBase = "https://api.openweathermap.org/data/2.5/weather?appid=" + authKey + "&q=Nashville";

// Basic URL for UV Index
var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=68d666b75db062eebadc3796248de346&lat=36.17&lon=-86.78"


function callWeather() {
    
    // Calls object from OpenWeather for weather data
    $.ajax({
        url: queryURLBase,
        method: "GET",
    })
        .then(function (response) {
            
            // Logs response from OpenWeather
            console.log(response.name);
            console.log(today);
            console.log(response.main.temp);
            console.log(response.wind.speed);
            console.log(response.main.humidity);

            $("h2").append("Current Weather");
            
            // Appends response from OpenWeather to the page
            $("#weatherBlock").append("<h3>" + response.name + "</h3>");
            $("#weatherBlock").append("<h3>" + today + "</h3>");
            $("#weatherBlock").append("<h3>" + "Temperature: "+ response.main.temp + "</h3>");
            $("#weatherBlock").append("<h3>" + "Wind: "+ response.wind.speed + "</h3>");
            $("#weatherBlock").append("<h3>" + "Humidity: "+ response.main.humidity + "</h3>");

    // Calls object from OpenWeather for UV Index data
    $.ajax({
        url: queryURL,
        method: "GET",
    })
        .then(function (response) {
            console.log(response.value);
            $("#weatherBlock").append("<h3>" + "UV Index: " + response.value + "</h3>");
        })

        })
}



// Onclick event that logs functions and appends them to the page
$("#getWeather").on("click", function () {

    
    callWeather();
})