//------------- Adds todays date--------------//
var today = moment();
$("#today").text(today.format("MMM Do, YYYY"));

 
//------Adds city inputs to Local Storage and then re-places them back on the webpage ---------------//
var cityInput = document.querySelector("#city-text");
var cityForm = document.querySelector("#city-form");
var cityList = document.querySelector("#city-list");
var getWeatherButton = document.querySelector("#getWeather");
var cities = [];
var cityName = document.querySelector("#cityName");
var city = document.querySelector("#city");
var tempSpot = document.querySelector("#temp");
var humidity = document.querySelector("#humidity");
var icon = document.querySelector("#weather-icon");
var uvIndex = document.querySelector("#uvIndex");

var futureDate = document.querySelector("#futureDate");
var futureIcon = document.querySelector("#futureIcon");
var futureTemp = document.querySelector("#futureTemp");
var futureWind = document.querySelector("#futureWind");
var futureHum = document.querySelector("#futureHum");


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


// Gets Lattitude and Longitude fir city
function getLocation() {
  var cityText = cityInput.value;
  var APIKey = "49f3f0a393b9b135b6d926bc4536144b";
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityText+"&appid="+APIKey;

  fetch(queryUrl).then(function (response){
      if(response.status === 404){
          return alert("Please enter a valid city!");
      } else {
          return response.json();
      }
  }).then(function (data) {
      if(data.status === 404){
          return alert("Please enter a valid city!");
      } else {
          storecities(cityText);
          let lat = data.coord.lat;
          let long = data.coord.lon;
          getCurrentWeather(lat, long, cityText);
          console.log(lat);
          console.log(long);
      };
  });
}
/*
  var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid="+APIKey;
  fetch(fiveDayQueryUrl).then(function (response){
    if(response.status === 404){
        return alert("Please enter a valid city!");
    } else{
        return response.json();
    }
}).then(function (data) {
    if(data.status === 404){
        return alert("Please enter a valid city!");
    } else {
        storeCities(cityText);
        let lat = data.coord.lat;
        let long = data.coord.lon;
        getCurrentWeather(lat, long, cityText);
        console.log(lat);
        console.log(long);
    };
});
*/




// Gets todays weather and posts it
getWeatherButton.addEventListener("click", function(event) {
  event.preventDefault();
  // creates a variable to take the city input and add it to the API request
  var cityText = cityInput.value;
  // Stores my API key in a variable
  var APIKey = "49f3f0a393b9b135b6d926bc4536144b";
  // Stores the API call in a variable
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityText+"&appid="+APIKey;
  
  // fetch API call for today's weather
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
    var fahrenheit = (((data.main.temp-273.15)*9)/5)+32;
    var decimal = fahrenheit.toFixed(0)
    tempSpot.textContent = decimal +'°';
    cityName.textContent = data.name;
    
    var iconPicture = document.createElement('img');
    var weatherIcon = data.weather[0].icon;
    iconPicture.src = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    icon.append(iconPicture);
    wind.textContent = "Wind Speed: "+data.wind.speed+" mph";
    humidity.textContent = "Humidity: "+data.main.humidity;
  };




  storecities();
  rendercities();
});

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