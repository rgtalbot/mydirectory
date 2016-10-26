angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider

    //home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

    //nerds page that will use the DirectoryController
        .when('/nerds', {
            templateUrl: 'views/login.html',
            controller: 'DirectoryController'
        });

    $locationProvider.html5Mode(true);

}]);