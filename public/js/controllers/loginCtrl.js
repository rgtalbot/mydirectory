angular.module('loginCtrl', []).controller("LoginController", ["$scope", "items", "$http", "$sessionStorage", "$state", function ($scope, items, $http, $sessionStorage, $state) {

    $scope.details = items.org.organization;

    if ($sessionStorage.currentUser) {
        $state.go('directory', {orgId: items.id, token: $sessionStorage.currentUser.token})
    }

    $scope.logMeIn = function () {


        var user = {
            email: $scope.user.email,
            password: $scope.user.password
        };
        var directoryUrl = items.id;
        var queryString = "https://my-directory-api.herokuapp.com/api/v1/auth/login/" + directoryUrl;

        AuthService($http, $sessionStorage, user.email, user.password, directoryUrl, function(cb) {
            if (cb == true) {
                $state.go('directory', {orgId: directoryUrl});
            }
        });




    }

}]);

function AuthService($http, $sessionStorage, username, password, url, callback) {


    var queryString = "https://my-directory-api.herokuapp.com/api/v1/auth/login/" + url;
    $http.post(queryString, {email: username, password: password})
        .success(function (response) {
            // login successful if there's a token in the response
            if (response.token) {
                // store username and token in local storage to keep user logged in between page refreshes
                $sessionStorage.currentUser = {username: username, token: response.token};

                // add jwt token to auth header for all requests made by the $http service
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                // execute callback with true to indicate successful login
                callback(true);
            } else {
                // execute callback with false to indicate failed login
                callback(false);
            }
        });
}