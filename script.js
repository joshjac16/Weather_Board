var searchBtn = document.getElementById("searchBtn");
var currentLoc = document.getElementById("curLoc");
var LocEL = document.getElementById("location");
var apiKey = "671e869318c1bfdbdda4a15c1e28d9ac";

var requestURL = `http://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=${apiKey}`;

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
        fiveDayHTML += `<div class="card" style="width: 175px  ;" ><h5 class="card-title row align-items-center">${dateTime}<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" /></h5>
            <h6 class="card-subtitle mb-2 text-muted">Temp:${data.list[i].main.temp} &deg;F</h6>
            <p class="card-text">Description: ${data.list[i].weather[0].description}</p>
            <p class="card-text">Wind Speed: ${data.list[i].wind.speed}</p>
            <p class="card-text">Humidity: ${data.list[i].main.humidity} &percnt;</p></div>`;
      }
      document.getElementById("FiveDay").innerHTML = fiveDayHTML;
    });
}
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var cityName = LocEL.value;
  var capCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  var searchHistory = JSON.parse(localStorage.getItem("Dashboard")) || [];
  if (cityName) {
    searchHistory.push(capCityName);
    localStorage.setItem("Dashboard", JSON.stringify(searchHistory));
    getCurrentWeather(cityName);
    getFiveDayForecast(cityName);
  }
});
