// A variable for my personal Open Weather API key
var apiKey = "86a0171fe8b8a02fbb9273530ba556fd";

// A variable for the city name, initially hard coded for testing
var city = "Jacksonville";

// Create a url for a current weather query, specifying the city, that imperial units are desired, and adding my API key
var weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

// Create a URL for a 5 day forcast query
var forecastApiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

// Function to get the current weather data
var getCurrentWeather = function() {
    console.log("the get current weather function has been called");
};

getCurrentWeather();