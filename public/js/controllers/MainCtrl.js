angular.module('MainCtrl', []).controller("MainController", ["$scope", "$http", function($scope, $http, $setValidity) {

    $scope.tagline = 'To the moon and back!';
    console.log($scope.tagline);



    $scope.urlValidate = function($setValidity) {
        var organization = $scope.urlInput;

        var queryString = "https://my-directory-api.herokuapp.com/api/v1/organizations/" + organization;

        $http.get(queryString).then(function successCallback(response) {
            console.log('not available');
            $scope.signUpForm.urlInput.$setValidity("taken", false);
        }, function errorCallback(response) {
            console.log('available');
        })

    }
}])