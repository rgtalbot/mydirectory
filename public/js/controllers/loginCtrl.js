app.controller("LoginController", ["$scope", "items", "$state", "AuthService", "$sessionStorage", function ($scope, items, $state, AuthService, $sessionStorage) {

    //organization information from object passed in
    $scope.details = items.org.organization;

    //check to see if they have a token in this session and if so, send them to their directory
    if ($sessionStorage.currentUser) {
        $state.go('directory', {orgId: items.id, token: $sessionStorage.currentUser.token})
    }

    //login function attached to Login button
    $scope.logMeIn = function () {

        //pull user emain and password from login form
        var email = $scope.user.email;
        var password = $scope.user.password;

        //build authentication string route
        var directoryUrl = items.id;
        var queryString = "https://my-directory-api.herokuapp.com/api/v1/auth/login/" + directoryUrl;

        //run authorization factory to see if the user gave the current information
        AuthService.authorize(email, password, queryString, function (cb) {
            if (cb == true) {
                $state.go('directory', {orgId: directoryUrl});
            }
        });
    }
}]);


















