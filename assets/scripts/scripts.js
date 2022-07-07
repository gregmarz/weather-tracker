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

var input = [];
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
    var cityNewCont = document.createElement("div")
    cityList.appendChild(cityNewCont);
    var cityNew = document.createElement("p")
    cityNew.innerHTML = input;
    cityNew.setAttribute("class", "card")
    cityNewCont.appendChild(cityNew);
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
            addCity();
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
        })
}










