gottaEat.controller('mainController', ['$scope', function($scope) {
    $scope.getRestaurant = function() {
        if ($scope.restaurants) {

        } else {
            $scope.isLoading = true;
        }
    }
}]);