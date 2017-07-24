gottaEat.controller('mainController', ['$scope', '$sce', function($scope, $sce) {
    $scope.showModal = false;
    $scope.restaurants = [];

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
        var location = new google.maps.LatLng(38.476415, -90.299430);

        var request = {
            location: location,
            radius: 1000,
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
}]);