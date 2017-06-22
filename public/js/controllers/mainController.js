gottaEat.controller('mainController', ['$scope', function($scope) {
    $scope.isLoading = false;
    $scope.restaurants = [];

    $scope.getRestaurant = function() {
        if ($scope.restaurants.length > 0) {

        } else {
            $scope.setLoader();
            callPlacesApi()
        }
    };

    $scope.setLoader = function() {
        $scope.isLoading = !$scope.isLoading;
    };

    var callPlacesApi = function() {
        var location = new google.maps.LatLng(38.476415, -90.299430);
        var request = {
            location: location,
            radius: 5000,
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
                $scope.$apply();
            }
        } else {
            $scope.error = true;
            $scope.setLoader();
            $scope.$apply();
        }
    }
}]);