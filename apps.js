// Variable for current date
var today = moment().format("dddd, MMMM Do YYYY");

// API Key
var authKey = "68d666b75db062eebadc3796248de346"

// Empty variable for user input
var queryTerm = "";

var lat = "";
var lon = "";

// Basic URL for weather
var queryURLBase = "https://api.openweathermap.org/data/2.5/weather?appid=" + authKey;

// Basic URL for UV Index
var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + authKey;
 

function callWeather(queryURLBase, queryURL) {
    
    // Calls object from OpenWeather for weather data
    $.ajax({
        url: queryURLBase,
        method: "GET",
    })
        .then(function (response) {
            
            console.log(response.coord);
            console.log(response.coord.lon);
            console.log(response.coord.lat);
            
            // Logs response from OpenWeather
            console.log(response.name);
            console.log(today);
            console.log(response.main.temp);
            console.log(response.wind.speed);
            console.log(response.main.humidity);

            
            // Appends response from OpenWeather to the page
            $("#weatherBlock").append("<h4>" + response.name + "</h4>");
            $("#weatherBlock").append("<h4>" + today + "</h4>");
            $("#weatherBlock").append("<h4>" + "Temperature: "+ response.main.temp + "</h4>");
            $("#weatherBlock").append("<h4>" + "Wind: "+ response.wind.speed + "</h4>");
            $("#weatherBlock").append("<h4>" + "Humidity: "+ response.main.humidity + "</h4>");

        })

    // Calls object from OpenWeather for UV Index data
    $.ajax({
        url: queryURL,
        method: "GET",
    })
        .then(function (response) {
            console.log(response.value);
            $("#weatherBlock").append("<h4>" + "UV Index: " + response.value + "</h4>");
        })
}



// Onclick event that prints weather info to the page
$("#getWeather").on("click", function (e) {
    
    e.preventDefault();

    // Takes in the inputted value
    queryTerm = $("#userInput").val().trim();

    // Concatenates inputted value with base url
    var newURL = queryURLBase + "&q=" + queryTerm;

    lat = ""; 

    lon = "";

    var newUV = queryURL + "&lat=" + lat + "&lon=" + lon;

    callWeather(newURL, newUV);
})