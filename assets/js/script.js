// A variable for my personal Open Weather API key
var apiKey = "86a0171fe8b8a02fbb9273530ba556fd";

// An element for the form
var cityFormEl = document.querySelector("#city-form");
// An element for the form input
var cityInputEl = document.querySelector("#city");
// An element for the current weather container
var currentWeatherContainerEl = document.querySelector("#current-weather-container");
// An element for the city returned by the API
var citySearchTerm = document.querySelector("#city-search-term");
// An element for the forecast container
var forecastContainerEl = document.querySelector("#forecast-container");

// A moment for the current date
var currentDate = moment().format("M/DD/YYYY");


// A function to handle the form input
var formSubmitHandler = function(event) {
    // prevent the default action of submitting the input to an external database
    event.preventDefault();
    console.log(event);
    // get the value of the city and clear the form
    var city = cityInputEl.value.trim();
    if (city) {
        getCurrentWeather(city);
        cityInputEl.value = "";
    // if no value is entered, alert the user
    } else {
        alert("Please enter a city");
    }
};

// Function to get the current weather data
var getCurrentWeather = function(city) {
    console.log("the get current weather function has been called for " + city);
    // Create a URL for a current weather query, specifying the city, that imperial units are desired, and adding my API key
    var weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=" + apiKey;
    fetch(weatherApiUrl).then(function(response) {
        response.json().then(function(data) {
            displayCurrentWeather(data, city);
        })
    })
};

// Function to display the current weather data
var displayCurrentWeather = function(weatherData, searchTerm) {
    console.log(weatherData);
    console.log(searchTerm);
    // clear old content
    currentWeatherContainerEl.innerHTML = "";
    // create a container for the current weather
    var currentWeatherEl = document.createElement("div");
    currentWeatherEl.classList = "card align-left p-3";

    // create a heading for the city name
    var cityNameHeader = document.createElement("h3");
    // get the city name that the API provided from the search
    var cityName = weatherData.name;
    // get the weather icon for the current weather
    var iconCode = weatherData.weather[0].icon;
    iconEl = getIcon(iconCode);
    // create the header
    cityNameHeader.textContent = cityName + " (" + currentDate + ") ";
    // append the icon to the header
    cityNameHeader.appendChild(iconEl);
    // append the name to the container
    currentWeatherEl.appendChild(cityNameHeader);

    // create an element for the temperature
    var currentTempEl = document.createElement("p");
    var currentTemp = weatherData.main.temp;
    console.log(currentTemp);
    currentTempEl.textContent = "Temperature: " + currentTemp + " °F";
    console.log(currentTempEl);
    currentWeatherEl.appendChild(currentTempEl);

    // append the container to the DOM
    currentWeatherContainerEl.appendChild(currentWeatherEl);

};

// Create a URL for a 5 day forcast query
var forecastApiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=" + apiKey;

// A function to generate the icon image tag
var getIcon = function(iconCode) {
    // Create a URL for the weather icon provided by the weather data
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
    // Create an icon image element
    var iconEl = document.createElement("img")
    iconEl.setAttribute("src", iconUrl)
    return(iconEl);
}


// Event Listener for the Search Button
cityFormEl.addEventListener("submit", formSubmitHandler)