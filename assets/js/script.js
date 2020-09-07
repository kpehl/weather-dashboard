// A variable for my personal Open Weather API key
var apiKey = "86a0171fe8b8a02fbb9273530ba556fd";

// An element for the form
var cityFormEl = document.querySelector("#city-form");
// An element for the form input
var cityInputEl = document.querySelector("#city");
// An element for the current weather container
var currentWeatherContainerEl = document.querySelector("#current-weather-container");
// An element for the current weather card
var currentWeatherEl = document.createElement("div");
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
        return response.json().then(function(data) {
            // display the weather data provided
            displayCurrentWeather(data, city);
            // Get the latitude and longitude from the weather data
            var cityLat = data.coord.lat;
            var cityLon = data.coord.lon;
            // console.log("the latitude is " + cityLat + " and the longitude is " + cityLon);
            // create a URL for the current UV index query
            var uvApiUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&APPID=" + apiKey;
            // use a nested fetch to get the UV data with the defined latitude and longitude
            return fetch(uvApiUrl);
        })
        .then(function(response) {
            return response.json().then(function(data) {
                // display the current UV data on the card
                displayCurrentUv(data);
            })
        })
    })
    .catch(function(error) {
        alert("Unable to connect to Open Weather Map Current Weather API")
    })
};

// Function to display the current weather data
var displayCurrentWeather = function(weatherData, searchTerm) {
    // console.log(weatherData);
    // console.log(searchTerm);
    // clear old content
    currentWeatherContainerEl.innerHTML = "";
    // create a container for the current weather
    // var currentWeatherEl = document.createElement("div");
    currentWeatherEl.classList = "card align-left p-3";
    currentWeatherEl.id = "current-weather"

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
    currentTempEl.textContent = "Temperature: " + currentTemp + " °F";
    currentWeatherEl.appendChild(currentTempEl);

    // create an element for the humidity
    var currentHumidityEl = document.createElement("p");
    var currentHumidity = weatherData.main.humidity;
    currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
    currentWeatherEl.appendChild(currentHumidityEl);
    
    // create an element for the wind speed
    var currentWindEl = document.createElement("p");
    var currentWind = weatherData.wind.speed;
    currentWindEl.textContent = "Wind Speed: " + currentWind + " MPH";
    currentWeatherEl.appendChild(currentWindEl);

    // // create an element for the UV index
    // currentWeatherEl.appendChild(currentUvEl);

    // append the container to the DOM
    currentWeatherContainerEl.appendChild(currentWeatherEl);

};

// A function to display the UV index data
var displayCurrentUv = function(data) {
    // create an element for the UV index
    var currentUvEl = document.createElement("p");
    // set the value based on the API data
    var currentUv = data.value;
    // add a badge span with a color for Favorable (success), Moderate (warning), and Sever (danger)
    var uvSpan = document.createElement("span");
    if (currentUv > 7) {
        uvSpan.classList = "badge badge-danger"
    } else if (currentUv > 3) {
        uvSpan.classList = "badge badge-warning"
    } else {
        uvSpan.classList = "badge badge-success"
    }

    // add the value of the UV index to the badge
    uvSpan.textContent = currentUv;
    // create the text context of the element
    currentUvEl.textContent = "UV Index: ";
    currentUvEl.appendChild(uvSpan);
    console.log(currentUvEl);
    // get the current weather card populated by displayCurrentWeather()
    currentWeatherEl.querySelector("#current-weather");
    // append the current UV index
    currentWeatherEl.appendChild(currentUvEl);
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