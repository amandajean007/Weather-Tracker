var today = moment();
$("#today").text(today.format("MMM Do, YYYY"));

var feedbackFieldCity = document.getElementById("cityForm");
var getWeatherButton = document.getElementById("getWeather");
var cityList = document.getElementById("myCities");
var today = document.getElementById("todaysWeather");

function getCityWeather() {
  cityList.textContent = localStorage.getItem("City ");
}

function setCityWeather() {
    localStorage.setItem("City ", feedbackFieldCity.value);
    getCityWeather();
}

getWeatherButton.addEventListener("click", setCityWeather);


fetch('api.openweathermap.org/data/2.5/weather?q='+feedbackFieldCity+'&appid=7c89fcf5fc9da80f2ff12bfa557dbb49')
.then(response => {
  return response.json();
})
.then(data => {
  today.appendChild(data);
})

