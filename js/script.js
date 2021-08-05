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
      //Loop over the data to generate a table, each table row will have a link to the request URL
      for (var i=0; i< data.length; i++) {
        // Creating elements: tablerow, tabledata, and anchor
        var createTableRow = document.createElement('tr');
        var tableData = document.createElement('td');

        // Setting the text of link and the href of the link
        link.textContent = data[i].html_url;
        link.href = data[i].html_url

        //Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
      }
    });

  if (cityText === "") {
    return;
  }

  cities.push(cityText);
  cityInput.value = "";

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

//---------Posts todays weather forecast API call-----------------------------------------------------------------------------------------------//
/*
var todaysWeather = document.getElementById("todaysWeather");

function getApi() {
  // Stores my API key in a variable
  var APIKey = "49f3f0a393b9b135b6d926bc4536144b";
  // Stores the API call in a variable
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityInput+"&appid="+APIKey;

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //Loop over the data to generate a table, each table row will have a link to the request URL
      for (var i=0; i< data.length; i++) {
        // Creating elements: tablerow, tabledata, and anchor
        var creeateTableRow = document.createElement('tr');
        var tableData = document.createElement('td');
        var link = document.createElement('a');

        // Setting the text of link and the href of the link
        link.textContent = data[i].html_url;
        link.href = data[i].html_url

        //Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        tableData.appendChild(link);
        creeateTableRow.appendChild(tableData);
        tableBody.appendChild(creeateTableRow); 
      }
    });
};

getWeatherButton.addEventListener("click", getApi()); */