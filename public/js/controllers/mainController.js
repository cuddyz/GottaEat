gottaEat.controller('mainController', ['$scope', '$sce', 'geolocation', function($scope, $sce, geolocation) {
    $scope.showModal = false;
    $scope.restaurants = [];
    $scope.radius = 3;
    $scope.minPrice = 1;
    $scope.maxPrice = 5;

    geolocation.getLocation()
        .catch(function(e) {
            $scope.locationError = true;
        })
        .then(function(data){
        $scope.lat = data.coords.latitude;
        $scope.long = data.coords.longitude;
        $scope.hasLocation = true;
    });

    $scope.getRestaurants = function() {
        $scope.showHideModal();
        if ($scope.restaurants.length > 0) {
            pickRestaurant();
        } else {
            callPlacesApi()
        }
    };

    $scope.showHideModal = function() {
        $scope.showModal = !$scope.showModal;
    };

    var pickRestaurant = function() {
        var random = Math.floor((Math.random() * $scope.restaurants.length));
        $scope.restaurant = $scope.restaurants[random];
    };

    var callPlacesApi = function() {
        var location = new google.maps.LatLng($scope.lat, $scope.long);

        var request = {
            location: location,
            radius: 1609 * $scope.radius,
            minprice: $scope.minPrice - 1,
            maxprice: $scope.maxPrice - 1,
            types: ['restaurant'],
            openNow: true
        };

        var service = new google.maps.places.PlacesService(document.createElement('div'));
        service.nearbySearch(request, callback);
    };

    var callback = function(results, status, page) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                $scope.restaurants.push(results[i]);
            }
            if (page.hasNextPage) {
                page.nextPage();
            } else {
                pickRestaurant();
                $scope.$apply();
                console.log($scope.restaurants);
            }
        } else {
            $scope.error = true;
            $scope.showHideModal();
            $scope.$apply();
        }
    };

    $scope.getMapURL = function() {
        if ($scope.restaurant) {
            return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyCsvltI-QXGXkrFAPf_BlazIrYLKH4lcmE&q=place_id:" + $scope.restaurant.place_id);
        }
        return "";
    }

    $scope.$on("slideEnded", function(slider) {
        if (slider.targetScope.rzSliderHigh) {
            $scope.minPrice = slider.targetScope.rzSliderModel;
            $scope.maxPrice = slider.targetScope.rzSliderHigh;
        } else {
            $scope.radius = slider.targetScope.rzSliderModel;
        }
        $scope.restaurants = [];
        $scope.restaurant = "";
    });
}]);