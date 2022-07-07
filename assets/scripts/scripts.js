var key = "b947ea02345fcb633ceba05df9ae4ea8";
var searchButton = $("#searchButton");
var searchInput = $("#searchInput");
var cityList = document.getElementById("cityList");

var input;
var latitude = 0;
var longitude = 0;

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
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + input + ",USA&units=imperial&appid=" + key
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
            latitude = data.coord.lat;
            longitude = data.coord.lon;
            addCity();
            return latitude, longitude;
        })
}



function requestTwo(latitude,longitude) {
    var url2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + key
    console.log(latitude);
    console.log(longitude);
    fetch(url2)
}










