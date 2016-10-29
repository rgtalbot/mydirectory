app.config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: "MainController"
        })
        .state('login', {
            url: '/:orgId',
            templateUrl: 'views/login.html',
            resolve: {
                items: ["$http", "$stateParams", "$state", function ($http, $stateParams, $state) {
                   return $http({
                        method: 'GET',
                        url: "https://my-directory-api.herokuapp.com/api/v1/organizations/" + $stateParams.orgId
                    }).then(function successCallback(response) {
                        return ({
                            org: response.data,
                            id: $stateParams.orgId
                        });
                    }, function errorCallback(response) {
                        $state.go('home');
                    });
                }]
            },
            controller: "LoginController"
        })
        .state('directory', {
            url: "/:orgId/directory",
            templateUrl: "views/directory.html",
            controller: "DirectoryController",
            params: {
                token: null
            }
        });

    $locationProvider.html5Mode(true);

}]);



