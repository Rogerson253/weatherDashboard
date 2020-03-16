// Variable for current date
var today = moment().format("dddd, MMMM Do YYYY");

// API Key
var authKey = "68d666b75db062eebadc3796248de346"

// Empty variable for user input
var queryTerm = "";

// Basic URL for weather
var queryURLBase = "https://api.openweathermap.org/data/2.5/weather?appid=" + authKey;

// Basic URL for UV Index
var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + authKey;
 
var cities = "";

function callWeather(queryURLBase, queryTerm) {
    
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

            // Clears previous entry
            $("#weatherBlock").empty();
           
            // Appends response from OpenWeather to the page
            $("#weatherBlock").append("<h4>" + response.name + "</h4>");
            $("#weatherBlock").append("<h4>" + today + "</h4>");
            $("#weatherBlock").append("<h4>" + "Temperature: "+ response.main.temp + "</h4>");
            $("#weatherBlock").append("<h4>" + "Wind: "+ response.wind.speed + "</h4>");
            $("#weatherBlock").append("<h4>" + "Humidity: "+ response.main.humidity + "</h4>");

            // Variables for latitude coords and longitude coords
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            // A new url based on the city inputted
            var newUV = queryURL + "&lat=" + lat + "&lon=" + lon;
            
    // Calls object from OpenWeather for UV Index data
    $.ajax({
        url: newUV,
        method: "GET",
    })
        .then(function (response) {
            console.log(response.value);
            console.log(queryTerm);

            var color = "black";

            if (response.value <= 2) {
                console.log(response.value, "green");
                color = "green";
            }
            else if (response.value <= 5) {
                console.log(response.value, "yellow");
                color = "yellow";
            }
            else if (response.value <= 7) {
                console.log(response.value, "orange");
                color = "orange";
            } 
            else if (response.value <= 10) {
                console.log(response.value, "red");
                color = "red";
            } 
            else if (response.value > 10) {
                console.log(response.value, "Put on some sunscreen.");
                color = "purple";
            } 
            
            $("#weatherBlock").append("<h4>" + "UV Index: <span id=" + queryTerm + "> " + response.value + "</span></h4>");
            document.getElementById(queryTerm).style.color = color;
           
        })
    })
}



// Onclick event that prints weather info to the page
$("#getWeather").on("click", function (e) {
    
    e.preventDefault();

    // Takes in the inputted value
    queryTerm = $("#userInput").val().trim();

    localStorage.setItem("City", queryTerm);
    console.log(queryTerm);

    var cityPaste = localStorage.getItem("City");
    console.log(cityPaste);

    $("#history").append("<h4>" + cityPaste + "</h4>");

    // Concatenates inputted value with base url
    var newURL = queryURLBase + "&q=" + queryTerm;

    callWeather(newURL, queryTerm);

})