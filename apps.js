var authKey = "68d666b75db062eebadc3796248de346"

// Empty variable for user input
var queryTerm = "";

// Basic URL
var  queryURLBase = "https://api.openweathermap.org/data/2.5/weather?appid=68d666b75db062eebadc3796248de346&q=Nashville";

// Calls object from OpenWeather
function callWeather() {
$.ajax({
    url: queryURLBase,
    method: "GET",
})
    .then(function(response){
        console.log(queryURLBase);
        console.log(response);
    })
}
callWeather();