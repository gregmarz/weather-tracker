var key = "b947ea02345fcb633ceba05df9ae4ea8";
var searchButton = $("#searchButton");
var searchInput = $("#searchInput");
var cityList = document.getElementById("cityList");

var cityName = document.getElementById("cityName");
var weatherImg = document.getElementById("weatherImg")
var cityTemp = document.getElementById("cityTemp");
var cityHumid = document.getElementById("cityHumid");
var cityWind = document.getElementById("cityWind");
var cityUV = document.getElementById("cityUV");

var savedCities = [];

var temp1 = document.getElementById("temp1");
var temp2 = document.getElementById("temp2");
var temp3 = document.getElementById("temp3");
var temp4 = document.getElementById("temp4");
var temp5 = document.getElementById("temp5");

var hum1 = document.getElementById("hum1");
var hum2 = document.getElementById("hum2");
var hum3 = document.getElementById("hum3");
var hum4 = document.getElementById("hum4");
var hum5 = document.getElementById("hum5");

var con1 = document.getElementById("con1");
var con2 = document.getElementById("con2");
var con3 = document.getElementById("con3");
var con4 = document.getElementById("con4");
var con5 = document.getElementById("con5");

var input;
var latitude = 0;
var longitude = 0;

var temp = 0;
var humidity = 0;
var wind_speed = 0;
var uvi = 0;

var update = function() {
    var time = document.getElementById("datetime")
    time.innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
}; 
setInterval(update, 1000);

$("#searchButton").click(function(event) {
    event.preventDefault();
    input = searchInput.val();
    console.log(input);
    requestOne();
})

function addCity() {
    var cityAdd = document.createElement("button");
    cityAdd.textContent = input;
    cityList.appendChild(cityAdd);
    cityAdd.addEventListener("click",function() {
        requestOne(addCity.textContent);
    })
}

function requestOne() {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=" + key
    console.log(url);
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                console.log("WRONG");
                return
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            latitude = data.coord.lat;
            longitude = data.coord.lon;
            console.log(latitude,longitude);
            savedCities.push(input);
            addCity();
            cityStore()
            return requestTwo(latitude, longitude);
        })
}

function requestTwo(latitude,longitude) {
    var url2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + key
    console.log(url2);
    fetch(url2)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            temp = data.current.temp;
            humidity = data.current.humidity;
            wind_speed = data.current.wind_speed;
            uvi = data.current.uvi * 10;
            cityName.textContent = input;
            cityTemp.textContent = "Temperature: " + temp;
            cityHumid.textContent = "Humidity: " + humidity;
            cityWind.textContent = "Wind Speed: " + wind_speed;
            cityUV.textContent = "UV Index: " + uvi;
            if (uvi > 8) {
                cityUV.setAttribute("style", "background-color:red");
            } else if (uvi > 5) {
                cityUV.setAttribute("style", "background-color:orange")
            } else {
                cityUV.setAttribute("style", "background-color:green")
            }
            temp1.textContent = "Temperature: " + data.daily[1].temp.day;
            hum1.textContent = "Humidity: " + data.daily[1].humidity;
            con1.textContent = "Condition: " + data.daily[1].weather[0].description;
            temp2.textContent = "Temperature: " + data.daily[2].temp.day;
            hum2.textContent = "Humidity: " + data.daily[2].humidity;
            con2.textContent = "Condition: " + data.daily[2].weather[0].description;
            temp3.textContent = "Temperature: " + data.daily[3].temp.day;
            hum3.textContent = "Humidity: " + data.daily[3].humidity;
            con3.textContent = "Condition: " + data.daily[3].weather[0].description;
            temp4.textContent = "Temperature: " + data.daily[4].temp.day;
            hum4.textContent = "Humidity: " + data.daily[4].humidity;
            con4.textContent = "Condition: " + data.daily[4].weather[0].description;
            temp5.textContent = "Temperature: " + data.daily[5].temp.day;
            hum5.textContent = "Humidity: " + data.daily[5].humidity;
            con5.textContent = "Condition: " + data.daily[5].weather[0].description;
        })
}

function cityStore() {
    var storage = JSON.stringify(savedCities);
    localStorage.setItem("cities",storage);
}