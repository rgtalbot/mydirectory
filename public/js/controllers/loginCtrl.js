angular.module('loginCtrl', []).controller("LoginController", ["$scope", "data", "$state", "$http", function ($scope, data, $state, $http) {
    $scope.details = data.organization.organization;


    console.log(data);

    $scope.logMeIn = function () {


        var user = {
            email: $scope.user.email,
            password: $scope.user.password
        };
        var directoryUrl = data.directoryUrl;
        var queryString = "https://my-directory-api.herokuapp.com/api/v1/auth/login/" + directoryUrl;
        $http.post(queryString, user).then(function successCallback(response) {
            console.log(response.data);
            var userObj = {
                token: response.data
            };
            $state.go('directory', {orgId: directoryUrl, token: userObj.token});

        }, function errorCallback(response) {
            console.log(response.data);
        });


    }

}]);
