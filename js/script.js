//------------- Adds todays date-----------------------------------------------------------------------------------------------------------------//
var today = moment();
$("#today").text(today.format("MMM Do, YYYY"));


//--------------Adds city inputs to Local Storage and then re-places them back on the webpage ---------------------------------------------------//
var cityInput = document.querySelector("#city-text");
var cityForm = document.querySelector("#city-form");
var cityList = document.querySelector("#city-list");
var getWeatherButton = document.querySelector("#getWeather");
var cities = [];

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

  var cityText = cityInput.value;


  if (cityText === "") {
    return;
  }

  cities.push(cityText);
  cityInput.value = "";


  storecities();
  rendercities();
});

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


/*
var stateInput = document.querySelector("#state-text");
var stateForm = document.querySelector("#state-form");
var stateList = document.querySelector("#state-list");
var states = [];

function renderstates() {

  stateList.innerHTML = "";


  for (var i = 0; i < states.length; i++) {
    var state = states[i];

    var ul = document.createElement("ul");
    ul.textContent = state;
    ul.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Remove";

    ul.appendChild(button);
    stateList.appendChild(ul);
  }
}

function init() {
  var storedstates = JSON.parse(localStorage.getItem("states"));

  if (storedstates !== null) {
    states = storedstates;
  }

  renderstates();
}

function storestates() {
  localStorage.setItem("states", JSON.stringify(states));
}

getWeatherButton.addEventListener("click", function(event) {
  event.preventDefault();

  var stateText = stateInput.value;

  if (stateText === "") {
    return;
  }

  states.push(stateText);
  stateInput.value = "";

  storestates();
  renderstates();
});

stateList.addEventListener("click", function(event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {

    var index = element.parentElement.getAttribute("data-index");
    states.splice(index, 1);

    storestates();
    renderstates();
  }
});

init()




*/


















//---------Posts todays weather forecast API call-----------------------------------------------------------------------------------------------//

var todaysWeather = document.getElementById("todaysWeather");
  // Storing my API key in a variable
var APIKey = "7c89fcf5fc9da80f2ff12bfa557dbb49";

// Defines a function that retrieves information from the API using fetch
function getWeather() {
  // Variable holding the API call
  var city = document.getElementById(cityInput);
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+",US&appid="+APIKey;
fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (var i = 0; i < data.length; i++) {
      var listItem = document.createElement('li');
      listItem.textContent = data[i].html_url;
      todaysWeather.appendChild(listItem);
      console.log(data);
    }
  });
}

// When the Get Weather button is clicked on, 
getWeatherButton.addEventListener("click", getWeather);