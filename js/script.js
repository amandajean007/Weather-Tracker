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
/*
getWeatherButton.addEventListener("click", setCityWeather);
*/

//Retrieves information from the API
fetch('api.openweathermap.org/data/2.5/weather?q='+feedbackFieldCity+'&appid=7c89fcf5fc9da80f2ff12bfa557dbb49')
.then(response => {
  return response.JSON();
})
.then(data => {
  today.appendChild(data);
})

/*------------------------------------------------------------------------------------------------------------------------------------------------*/
var cityInput = document.querySelector("#cityForm");
var cityForm = document.querySelector("#city-form");
var myCities = document.querySelector("#myCities");
var cities = [];

// TODO: What is the purpose of this function? .....................will pull the todos
function renderTodos() {
  // TODO: Describe the functionality of the following two lines of code. ........pulling from innerHTML to DOM including length for loop
  myCities.innerHTML = ""; 
  
  // TODO: Describe the functionality of the following `for` loop. takes in user input and makes it into an element and creates the list item and the complete button and pushes onto dom
  for (var i = 0; i < cities.length; i++) {
    var todo = cities[i];
// creates list item and pushes to the dom
    var ul = document.createElement("ul");
    ul.textContent = todo;
    ul.setAttribute("data-index", i);
//creates element to be pushed onto the dom
    var button = document.createElement("button");
    button.textContent = "Remove City";
//appends to go onto dom once created
    ul.appendChild(button);
    myCities.appendChild(ul);
    //when creating element- remember to append or will not show up on dom
  }
}

// TODO: What is the purpose of the following function?
function init() {
  // TODO: What is the purpose of the following line of code?
  //takes a string  oand turns it into an object
  var storedTodos = JSON.parse(localStorage.getItem("todos"));
  // TODO: Describe the functionality of the following `if` statement.          makes it so if nothing is in the string nothing will be added
  if (storedTodos !== null) {
    cities = storedTodos;
  }
  // TODO: Describe the purpose of the following line of code.     runs the function, pulls info back
  renderTodos();
}

function storeTodos() {
  // TODO: Describe the purpose of the following line of code.      turns object into a string
  localStorage.setItem("todos", JSON.stringify(cities));
}

// TODO: Describe the purpose of the following line of code.  when event submit is clicked it takes it to local storage
cityForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var todoText = cityInput.value.trim();
  // TODO: Describe the functionality of the following `if` statement. if text box is left blank, return a 
  if (todoText === "") {
    return;
  }
 // TODO: Describe the purpose of the following lines of code.       adding a new value to that array 
  cities.push(todoText);
  cityInput.value = "";
 
  // TODO: What will happen when the following functions are called? .......will take the inputs and store them ...........recalls the info
  storeTodos();
  renderTodos();
});

// TODO: Describe the purpose of the following line of code. ....... when you click this button, 
myCities.addEventListener("click", function(event) {
  var element = event.target;
  // TODO: Describe the functionality of the following `if` statement.
  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    cities.splice(index, 1);
    // TODO: What will happen when the following functions are called?
    storeTodos();
    renderTodos();
  }
});

init();
