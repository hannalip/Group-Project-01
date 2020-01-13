$(document).ready(function () {
    var latitude;
    var longitude;

    $(".submit").on("click", function (event) {
        event.preventDefault();
        clear();
        // Get from the form how the client wants to get food
        getResturants();

    });


    function getResturants() {
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
        // Resturant AJAX Call
        console.log(json);
        // Filter Results Function
        const dataFilteredByCuisinePrice = json.result.data.filter(function (r) {
            if (r.cuisines.includes(cuisine) && r.price_range.includes(pricepoint)) {
                return true;
            }
            else {
                "No Resturants Avilable"
                return false;
            }
        });


        // Array#includes and Array#filter
        console.log(dataFilteredByCuisinePrice)

        var fiverow = $("<div>").attr("class", "resultsdisplay")
        $("#resturantdisplay").append(fiverow);
        $("#restHeader").append("<h1>Show Me The Food!</h1>")
        for (var i = 0; i < dataFilteredByCuisinePrice.length; i++) {

            var newCol = $("<div>").attr("class", "cards");
            fiverow.append(newCol);

            var newCard = $("<div>").attr("class", "card text-white bg-primary");
            newCol.append(newCard);

            var cardHead = $("<h3>").attr("class", "card-header").text(JSON.stringify(dataFilteredByCuisinePrice[i].restaurant_name));
            newCard.append(cardHead);

            var bodyDiv = $("<div>").attr("class", "card-body");
            newCard.append(bodyDiv);

            bodyDiv.append($("<p>").attr("class", "card-text").html("Address: " + JSON.stringify(dataFilteredByCuisinePrice[i].address.formatted)));
            bodyDiv.append($("<p>").attr("class", "card-text").text("Hours: " + JSON.stringify(dataFilteredByCuisinePrice[i].hours)));
        }
    
}

function geoFindMe() {
    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
    mapLink.href = '';
    mapLink.textContent = '';
    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);
        status.textContent = ' ';
        // queryURL is the url we'll use to query the API
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        console.log(mapLink.textContent)
        // getResturants(longitude, latitude)
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
geoFindMe();
});

function clear() {
    //clear all the weather
    $("#resturantdisplay").empty();
    $("#restHeader").empty();
}
