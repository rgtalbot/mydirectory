angular.module('loginCtrl', []).controller("LoginController", ["$scope", "data", "$state", "$http", function ($scope, data, $state, $http) {
    $scope.details = data.organization.organization;


    console.log(data);

    $scope.logMeIn = function () {


        var user = {
            email: $scope.user.email,
            password: $scope.user.password
        };
        var directoryUrl = data.directoryUrl;
        var queryString = "https://my-directory-api.herokuapp.com/api/v1/auth/" + directoryUrl + "/login";
        $http.post(queryString, user).then(function successCallback(response) {
            console.log(response.data);
            var userObj = {
                token: response.data
            };
            console.log("success");
            $state.go('directory', userObj);

        }, function errorCallback(response) {
            console.log(response.data);
            console.log("failure");
        });


    }

}]);


//THE POST TO LOGIN AND GET A JWT TO REDIRECT WITH
// router.post('/:organizationId/login', function (req, res) {
//
//     var directoryUrl = req.params.organizationId;
//     var queryString = myDirectory + "auth/" + directoryUrl + "/login";
//     var redirectString = "/" + directoryUrl;
//     request({
//         url: queryString,
//         method: "POST",
//         form: {
//             email: req.body.username,
//             password: req.body.password
//         }
//     }, function (error, response, body) {
//         var parsed = JSON.parse(body);
//         console.log("token", parsed.token);
//
//         if (response.statusCode === 200) {
//             localStorage.setItem('token', parsed.token);
//             res.redirect('/' + directoryUrl + '/directory');
//         } else {
//             res.redirect(redirectString);
//         }
//     });
// });
