function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hour}:${min}`;
}

function showTemp(response) {
  let currentTemp = document.querySelector("#temp");
  let h1 = document.querySelector("h1");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#weather-description");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#weather-icon");

  celsiusTemp = response.data.main.temp;
  let temp = Math.round(celsiusTemp);

  currentTemp.innerHTML = temp;
  h1.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  description.innerHTML = response.data.weather[0].description;
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let key = "0450c0689074241f96d64430080fae72";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${unit}`;
  axios.get(url).then(showTemp);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getPosition);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-line");

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
    searchCity(searchInput.value);
  }
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "0450c0689074241f96d64430080fae72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemp = celsiusTemp * 1.8 + 32.0;
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  currentTemp.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

searchCity("New York");

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);
