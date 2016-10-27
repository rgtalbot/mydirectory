angular.module('appRoutes', ['ui.router']).config(['$routeProvider', '$locationProvider', '$stateProvider', function ($routeProvider, $locationProvider, $stateProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html'
        })
        .state('login', {
            url: '/:orgId',
            templateUrl: 'views/login.html',
            resolve: {
                data: function ($http, $stateParams, $state, $q) {
                    var defObj = $q.defer();
                    $http({
                        method: 'GET',
                        url: "https://my-directory-api.herokuapp.com/api/v1/organizations/" + $stateParams.orgId
                    }).then(function successCallback(response) {
                        var data = {
                            organization: response.data,
                            directoryUrl: $stateParams.orgId
                        };
                        defObj.resolve(data);
                    }, function errorCallback(response) {
                        $state.go('home');
                    });
                    return defObj.promise;
                }
            },
            controller: "LoginController"
        })
        .state('directory', {
            url: ":orgId/directory",
            templateUrl: "views/directory.html",
            controller: "DirectoryController",
            params: {
                token: null
            }
        });

    $locationProvider.html5Mode(true);

}]);