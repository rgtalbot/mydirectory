//this is where you would use $http or $resource to do your API calls to the Node backend from your Angular frontend


angular.module('AuthService', []).factory('AuthService', ['$http', "$localStorage", function ($http, $localStorage) {

    return {

        authorize: function (username, password, url, callback) {
        var queryString = "https://my-directory-api.herokuapp.com/api/v1/auth/login" + url;
        $http.post(queryString, {username: username, password: password})
            .success(function (response) {
                // login successful if there's a token in the response
                if (response.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = {username: username, token: response.token};

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

}

}]);
