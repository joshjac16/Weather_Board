var searchBtn = document.getElementById("searchBtn");
var currentLoc = document.getElementById("curLoc");
var LocEL = document.getElementById("location");
var apiKey = "671e869318c1bfdbdda4a15c1e28d9ac";

var requestURL = `http://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=${apiKey}`;

// The getCurrentWeather() function fetches the api and gets the current weather information of the city which was entered by the client 
// then displays it as a main card

function getCurrentWeather(cityName) {
  let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  fetch(currentWeatherURL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      document.getElementById("day_card").style.display = "block";
      var currCardEl = document.getElementById("currCard");
      var dateTime = dayjs.unix(data.dt).format("MM/DD/YYYY   hh:mm:ss A");
      var currWeatherContent = ` <h5 class="card-title">${data.name}<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h5>
      <p class="card-text">${dateTime}</p>
      <p class="card-text">Temp:${data.main.temp} &deg;F</p>
      <p class="card-text">Description: ${data.weather[0].description}</p>
      <p class="card-text">Wind Speed: ${data.wind.speed}</p>
      <p class="card-text">Humidity: ${data.main.humidity} &percnt;</p>`;
      console.log(currWeatherContent);
      currCardEl.innerHTML = currWeatherContent;
    });
}
// The getFiveDayForecast() function uses the fetched data from the getCurrentWeather() function and also gets a 5-day forecast
// then displays it as 5 cards  

function getFiveDayForecast(cityName) {
  let FiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
  fetch(FiveDayForecastURL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var fiveDayHTML = "";
      for (let i = 4; i < data.list.length; i = i + 8) {
        var dateTime = dayjs
          .unix(data.list[i].dt)
          .format("MM/DD/YYYY   hh:mm:ss A");
        console.log(dateTime);
        fiveDayHTML += `<div class="card" style="width: 175px; background-color:#7fb9b2; margin:20px" ><h5 class="card-title row align-items-center">${dateTime}<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" /></h5>
        <h6 class="card-subtitle mb-2 text-muted">Temp:${data.list[i].main.temp} &deg;F</h6>
        <p class="card-text">Description: ${data.list[i].weather[0].description}</p>
        <p class="card-text">Wind Speed: ${data.list[i].wind.speed}</p>
        <p class="card-text">Humidity: ${data.list[i].main.humidity} &percnt;</p></div>`;
      }
      document.getElementById("FiveDay").innerHTML = fiveDayHTML;
    });
}

// Adds eventlisteners to the buttons on the browser

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var cityName = LocEL.value;
  var capCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  var searchHistory = JSON.parse(localStorage.getItem("Dashboard")) || [];
  if (cityName) {
    if (searchHistory.includes(capCityName)) {
    } else {
      searchHistory.push(capCityName);
      localStorage.setItem("Dashboard", JSON.stringify(searchHistory));
    }

    displayPrevSearch();
    getCurrentWeather(cityName);
    getFiveDayForecast(cityName);
  }
});

// The below function displays the names of the previous searched cities as buttons on the side bar 
// and once clicked takes shows the current weather and 5 day forecast 

function displayPrevSearch() {
  var searchHistory = JSON.parse(localStorage.getItem("Dashboard")) || [];
  var prevSearch = "";
  for (let i = 0; i < searchHistory.length; i++) {
    prevSearch += `<button class="btn btn-default btn-block p-3 previousSearch">${searchHistory[i]}</button>`;
  }
  document.getElementById("city").innerHTML = prevSearch;
  var previousSearchEvtList = document.querySelectorAll(".previousSearch");

  previousSearchEvtList.forEach((button) =>
    button.addEventListener("click", prevSearchForecast)
  );
}
displayPrevSearch(); // has previous searches (if any) displayed on the page on initial call

function prevSearchForecast(event) {
  var city = event.target.textContent;
  getCurrentWeather(city);
  getFiveDayForecast(city);
}
