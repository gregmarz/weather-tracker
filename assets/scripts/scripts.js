var key = "b947ea02345fcb633ceba05df9ae4ea8";
var searchButton = $("#searchButton")
var searchInput = $("#searchInput")
let input;


$("#searchButton").click(function(event) {
    event.preventDefault();
    input = searchInput.val();
    console.log(input);
})















var update = function() {
    var time = document.getElementById("datetime")
    time.innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
}; 
setInterval(update, 1000);