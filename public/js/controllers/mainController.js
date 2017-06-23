gottaEat.controller('mainController', ['$scope', function($scope) {
    $scope.isLoading = false;
    $scope.showModal = false;
    $scope.restaurants = [];

    $scope.getRestaurants = function() {
        $scope.setLoader();
        if ($scope.restaurants.length > 0) {
            pickRestaurant();
            $scope.showHideModal();
            $scope.setLoader();
        } else {
            callPlacesApi()
        }
    };

    $scope.setLoader = function() {
        $scope.isLoading = !$scope.isLoading;
    };

    $scope.showHideModal = function() {
        $scope.showModal = !$scope.showModal;
    };

    var pickRestaurant = function() {
        var random = Math.floor((Math.random() * $scope.restaurants.length));
        console.log($scope.restaurants[random]);
    };

    var callPlacesApi = function() {
        var location = new google.maps.LatLng(38.476415, -90.299430);
        var request = {
            location: location,
            radius: 1000,
            types: ['restaurant'],
            openNow: true
        };

        var map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 15
        });

        var service = new google.maps.places.PlacesService(map);
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
                $scope.setLoader();
                $scope.showHideModal();
                $scope.$apply();
                pickRestaurant();
            }
        } else {
            $scope.error = true;
            $scope.setLoader();
            $scope.$apply();
        }
    }
}]);