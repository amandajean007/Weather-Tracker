// Add todays date
var today = moment();
$("#today").text(today.format("MMM Do, YYYY"));


// Creates variables to attach Javascript commands to places in the HTML document
  // In the header where todays date will be shown
var today = document.getElementById("todaysWeather");
  // Form where you type in the city to be searched, it grabs the info you type in with ".value"
var cityInput = document.getElementById("cityForm").value;
  // The button bellow the search city input box
var getWeatherButton = document.getElementById("getWeather");
  // Bottom Left Box where cities searched will be listed
var cityList = document.getElementById("myCities");
  // The object where the list of searched cities will be placed
var cities = [];
  // Storing my API key in a variable
var APIKey = "7c89fcf5fc9da80f2ff12bfa557dbb49";
  // Variable calling the API
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+cityInput+"&appid="+APIKey;


// Pulls cities from local storage with key="City " to add to the recently searched cities list in the bottom left box of the webpage
function putCitiesOnPage() {
  cityList.textContent = localStorage.getItem("City ");
  // Takes in user input and makes it into an element and creates the list item and the complete button and pushes onto DOM
  for (var i = 0; i < cities.length; i++) {
    var City = cities[i];
        // creates list item and pushes to the DOM
        var ul = document.createElement("ul");
        ul.textContent = City;
        ul.setAttribute("data-index", i);
        // Creates element to be pushed onto the DOM
        var button = document.createElement("button");
        button.textContent = "Remove City";
        // Adds buttons and cities to the list
        ul.appendChild(button);
        cityList.appendChild(ul);
      };
    }

// Adds Inputed City "value" into local storage with key "City ". Then puts them back on the page with function putCitiesOnPage().
function setCityWeather() {
    localStorage.setItem("City ", cityInput);
    putCitiesOnPage();
}

//Retrieves information from the API
function getWeather(queryURL) {
  fetch(queryURL)
  .then(response => response.json())
  .then(data => console.log(data));
}

function init() {
  var storedCities = JSON.parse(localStorage.getItem("Cities"));
  if (storedCities !== null) {
    cities = storedCities;
  }
  putCitiesOnPage();
}

function storeCities() {
  localStorage.setItem("Cities", JSON.stringify(cities));
}

getWeatherButton.addEventListener("click", function(event) {
  event.preventDefault();
  var cityText = cityInput;
  if (cityText === "") {
    return;
  }
  cities.push(cityText);
  cityInput = "";
  storeCities();
  putCitiesOnPage();
});

cityList.addEventListener("click", function(event) {
  var element = event.target;
  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    cities.splice(index, 1);
    storeCities();
    putCitiesOnPage();
  }
});

init();