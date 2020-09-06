// A variable for my personal Open Weather API key
var apiKey = "86a0171fe8b8a02fbb9273530ba556fd";

// An element for the form
var cityFormEl = document.querySelector("#city-form");
// An element for the form input
var cityInputEl = document.querySelector("#city");

// A function to handle the form input
var formSubmitHandler = function(event) {
    // prevent the default action of submitting the input to an external database
    event.preventDefault();
    console.log(event);
    // get the value of the city
    var city = cityInputEl.value.trim();
    if (city) {
        getCurrentWeather(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
};

// Create a URL for a 5 day forcast query
var forecastApiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=" + apiKey;

// Function to get the current weather data
var getCurrentWeather = function(city) {
    console.log("the get current weather function has been called for " + city);
    // Create a URL for a current weather query, specifying the city, that imperial units are desired, and adding my API key
    var weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=" + apiKey;
    fetch(weatherApiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })
};

// A function to generate the icon image tag
var getIcon = function(iconCode) {
    // Create a URL for the weather icon provided by the weather data
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
    // Create an icon image element
    var iconEl = document.createElement("img")
    iconEl.setAttribute("src", iconUrl)
}


// Event Listener for the Search Button
cityFormEl.addEventListener("submit", formSubmitHandler)