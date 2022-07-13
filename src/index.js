import "./styles.css";

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

/// DATA ATUAL
let dateElement = document.querySelector("#date_time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

/// MUDAR DE CIDADE

function showTemperature(response) {
  let tempElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#cidade").innerHTML = response.data.name;

  tempElement.innerHTML = `${temperature}`;

  let humidityElement = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  humidityElement.innerHTML = `${humidity}`;
  let windElement = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `${wind}`;
  document.querySelector("#w-description").innerHTML =
    response.data.weather[0].main;
}

function search(event) {
  event.preventDefault();

  let apiKey = "c0319fc534d112644590c2ba188b9555";
  let units = "metric";
  let cityInput = document.querySelector("#search-text");
  let city = cityInput.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

/// CONVERSOES CELSIUS FAHRENHEIT
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
