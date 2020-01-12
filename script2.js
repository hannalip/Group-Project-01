$(document).ready(function () {
    var latitude;
    var longitude;

    $(".submit").on("click", function () {
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
        // Resturant AJAX Call
            console.log(json);
            // Filter Results Function
            const dataFilteredByCuisinePrice = json.result.data.filter(function (r) {
                if (r.cuisines.includes(cuisine) && r.price_range.includes(pricepoint)) return true;
                return false;
            })
            // Array#includes and Array#filter
            console.log(dataFilteredByCuisinePrice)
            $("#cityresturantdisplay").html("<h1>" + dataFilteredByCuisinePrice);

    });

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
            status.textContent = '';
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

