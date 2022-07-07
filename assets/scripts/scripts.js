var key = "b947ea02345fcb633ceba05df9ae4ea8";
var searchButton = $("#searchButton")
var searchInput = $("#searchInput")

let input;


var update = function() {
    var time = document.getElementById("datetime")
    time.innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
}; 
setInterval(update, 1000);

$("#searchButton").click(function(event) {
    event.preventDefault();
    input = searchInput.val();
    console.log(input);
    url();
})

function url() {
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
            console.log(data.coord.lat);
            console.log(data.coord.lon)
        })
}












