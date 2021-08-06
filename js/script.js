//------------- Adds todays date-----------------------------------------------------------------------------------------------------------------//
var today = moment();
$("#today").text(today.format("MMM Do, YYYY"));

 
//--------------Adds city inputs to Local Storage and then re-places them back on the webpage ---------------------------------------------------//
var cityInput = document.querySelector("#city-text");
var cityForm = document.querySelector("#city-form");
var cityList = document.querySelector("#city-list");
var getWeatherButton = document.querySelector("#getWeather");
var cities = [];
var cityName = document.querySelector("#cityName");
var city = document.querySelector("#city");
var temp = document.querySelector("#temp");
var desc = document.querySelector("#desc");
var humidity = document.querySelector("#humidity");
var icon = document.querySelector("#weather-icon");
var uvIndex = document.querySelector("#uvIndex");


function rendercities() {

  cityList.innerHTML = "";


  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];

    var ul = document.createElement("ul");
    ul.textContent = city;
    ul.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Remove";

    ul.appendChild(button);
    cityList.appendChild(ul);
  }
}

function init() {
  var storedcities = JSON.parse(localStorage.getItem("cities"));

  if (storedcities !== null) {
    cities = storedcities;
  }

  rendercities();
}

function storecities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

getWeatherButton.addEventListener("click", function(event) {
  event.preventDefault();
  // creates a variable to take the city input and add it to the API request
  var cityText = cityInput.value;
  // Stores my API key in a variable
  var APIKey = "49f3f0a393b9b135b6d926bc4536144b";
  // Stores the API call in a variable
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityText+"&appid="+APIKey;

  // fetch API call
  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
        show(data);
    
    });

  if (cityText === "") {
    return;
  }

  cities.push(cityText);
  cityInput.value = "";

  function show(data) {
    console.log(data.main.temp);
    temp.textContent = data.main.temp;
    cityName.textContent = data.name;
    icon.textContent = data.weather[0].icon;
    wind.textContent = data.wind.speed;
    humidity.textContent = data.main.humidity;
  };

  storecities();
  rendercities();
 });

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Will remove the city from the list when you click "remove"
cityList.addEventListener("click", function(event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {

    var index = element.parentElement.getAttribute("data-index");
    cities.splice(index, 1);

    storecities();
    rendercities();
  }
});

init();