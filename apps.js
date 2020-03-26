// Variable for current date
var today = moment().format("dddd, MMMM Do YYYY");

// API Key
var authKey = "68d666b75db062eebadc3796248de346"

// Empty variable for user input
var queryTerm = "";

// Basic URL for weather
var queryURLBase = "https://api.openweathermap.org/data/2.5/weather?appid=" + authKey + "&q=";

// Basic URL for UV Index
var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + authKey;
 
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?appid=" + authKey + "&q=";


if (JSON.parse(localStorage.getItem("Cities"))) {
    var city = JSON.parse(localStorage.getItem("Cities"));
    callWeather(queryURLBase, city[city.length-1]);
    cityStick();
}
else {
    var city = [];
}



function cityStick() {
    $("#history").empty();

    for (var i = 0; i < city.length; i++) {
        $("#history").append("<h4>" + city[i] + "</h4>");
    }
    
}


function callWeather(queryURLBase, queryTerm) {
    
    // Calls object from OpenWeather for weather data
    $.ajax({
        url: queryURLBase + queryTerm,
        method: "GET",
    })
        .then(function (response) {

            var temp = Math.floor((response.main.temp - 273.15) * 1.80 + 32);
            // Clears previous entry
            $("#weatherBlock").empty();
           
            // Appends response from OpenWeather to the page
            var cards = $("<div>");
            cards.addClass("card-body")

            cards.append("<h4>" + response.name + "</h4>");
            cards.append("<h4>" + today + "</h4>");
            cards.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
            cards.append("<h4>" + "Temperature: "+ temp + " degrees F" + "</h4>");
            cards.append("<h4>" + "Wind: "+ response.wind.speed + "</h4>");
            cards.append("<h4>" + "Humidity: "+ response.main.humidity + "</h4>");

            $("#weatherBlock").append(cards);

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
         
            var queryTermTrimmed = queryTerm.toLowerCase().replace(" ", "")
            
            var color = "black";

            if (response.value <= 2) {
                color = "green";
            }
            else if (response.value <= 5) {
                color = "yellow";
            }
            else if (response.value <= 7) {
                color = "orange";
            } 
            else if (response.value < 11) {
                color = "red";
            } 
            else if (response.value > 11) {
                color = "purple";
            } 
            
            cards.append("<h4>" + "UV Index: <span id=" + queryTermTrimmed + "> " + response.value + "</span></h4>");
            document.getElementById(queryTermTrimmed).style.color = color;
           
        })
    })
}

function fiveDayForecast(forecastURL, queryTerm) {
    $.ajax({
        url: forecastURL + queryTerm,
        method: "GET",
    })
        .then(function(response) {
         
            for (var i = 0; i < response.list.length; i++) {

                var temp = Math.floor((response.list[i].main.temp - 273.15) * 1.80 + 32);

                if (response.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                    // 12:00 P.M
                    var cardCast = $("<div>");
                    cardCast.addClass("list-group-item");
                    
                    var nextDay = moment().add(i + 1, "day").format("dddd");
                    console.log(nextDay);
                    
                    cardCast.append("<h4>" + nextDay + "<h4>");
                    cardCast.append("<img src='https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png'>");
                    cardCast.append("<h4>" + temp + " degrees F" + "<h4>");
                    cardCast.append("<h4>" + response.list[i].weather[0].main + "<h4>");
                    cardCast.append("<h4>" + response.list[i].weather[0].description + "<h4>");
                    cardCast.append("<h4>" + response.list[i].main.humidity + "<h4>");
                    
                    $("#forecast").append(cardCast);
            }
        }
        })
}

// Onclick event that prints weather info to the page
$("#getWeather").on("click", function (e) {
    
    e.preventDefault();

    // Takes in the inputted value
    queryTerm = $("#userInput").val().trim();

    // Concatenates inputted value with base url
    var newURL = queryURLBase;

    var forecast = forecastURL;

    callWeather(newURL, queryTerm);
    fiveDayForecast(forecast, queryTerm);
    cityStore();
    cityStick();
    $("#userInput").val("");
})



function cityStore() {

    queryTerm = $("#userInput").val().trim();

    city.push(queryTerm);
    if (city.length > 5) {
        city.shift();
    }
    localStorage.setItem("Cities", JSON.stringify(city));
   
}

