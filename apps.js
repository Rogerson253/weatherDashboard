var authKey = "68d666b75db062eebadc3796248de346"

// Empty variable for user input
var queryTerm = "";

// Basic URL
var  queryURLBase = "https://api.openweathermap.org/data/2.5/weather?appid=68d666b75db062eebadc3796248de346&q=Nashville";

var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=68d666b75db062eebadc3796248de346&lat=36.17&lon=-86.78"

// Calls object from OpenWeather for weather data
function callWeather() {
$.ajax({
    url: queryURLBase,
    method: "GET",
})
    .then(function(response){
        console.log(queryURLBase);
        console.log(response);
        console.log(response.main.temp);
        console.log(response.name);
        console.log(response.wind.speed);
        console.log(response.main.humidity);
       
    })
}


// Calls object from OpenWeather for UV Index data
function callUv() {
$.ajax({
    url: queryURL,
    method: "GET",
})
    .then(function(response){
        console.log(queryURL);
        console.log(response);
        console.log(response.value);
    })
}




$("#getWeather").on("click", function(){
    callWeather();
    callUv();
})