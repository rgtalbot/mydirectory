//factory to see if user exists and log them in
app.factory('AuthService', ['$http', "$sessionStorage", function ($http, $sessionStorage) {

    return {

        authorize: function (username, password, query, callback) {

            //post with information from login controller to hit the api route
        $http.post(query, {email: username, password: password})

            .success(function (response) {
                // login successful if there's a token in the response

                if (response.token) {

                    // store username and token in local storage to keep user logged in between page refreshes
                    $sessionStorage.currentUser = {email: username, token: response.token};

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
