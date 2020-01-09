$(document).ready(function () {
    geoFindMe();
});


var queryParams = {};

$(".submit").on("click", function() {

    // Get from the form how the client wants to get food
    var dineorpick = $(".dineorpick").val();
    console.log(dineorpick)

    // Get from the form the meal type
    var mealtype = $(".mealtype").val();
    console.log(mealtype)
    // Get from the form the cuisine
    var cuisine = $(".cuisine").val();
    console.log(cuisine)
    // Get from the form the price
    var pricepoint = $(".pricepoint").val();
    console.log(pricepoint)
    // Get from the form the number of results to display
    var numplaces = $(".numplaces").val();

});

    function geoFindMe() {

        const status = document.querySelector('#status');
        const mapLink = document.querySelector('#map-link');
    
        mapLink.href = '';
        mapLink.textContent = '';
    
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(latitude);
            console.log(longitude);
    
            status.textContent = '';
            // queryURL is the url we'll use to query the API
            mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
            console.log(mapLink.textContent)
            getResturants(longitude, latitude)
        }
    
        function error() {
            status.textContent = 'Unable to retrieve your location';
        }
    
        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
        }
    
    }
    
    function getResturants(longitude, latitude) {
        var usRestaurantMenus = {
            "async": true,
            "crossDomain": true,
            "url": "https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?page=1&lon=" + longitude + "&lat=" + latitude + "&distance=1",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
                "x-rapidapi-key": "db19f6c31fmsh74ab69ea63379d5p187630jsn004e83353fc9"
            }
        }
        $.ajax(usRestaurantMenus).done(function (response) {
            console.log(response);
        });
    };
    
    