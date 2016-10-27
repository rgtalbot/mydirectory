angular.module('appRoutes', ['ui.router']).config(['$routeProvider', '$locationProvider', '$stateProvider', function ($routeProvider, $locationProvider, $stateProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html'
        })
        .state('directory', {
            url:'/org/directory',
            templateUrl: 'views/directory.html',
            params: {
                userObj: ""
            },
            controller: "DirectoryController"
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
                        console.log(response.data);
                        console.log($stateParams.orgId);
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
        });


    // $routeProvider
    //
    // //home page
    //     .when('/', {
    //         templateUrl: 'views/home.html',
    //         controller: 'MainController'
    //     })
    //
    //     //takes you to login page or home if directory does not exist.
    //     .when('/:name', {
    //         templateUrl: 'views/login.html',
    //         controller: 'DirectoryController',
    //         resolve: {
    //             data: function ($http, $route, $location, $q) {
    //                 var defObj = $q.defer();
    //                 $http({
    //                     method: 'GET',
    //                     url: "https://my-directory-api.herokuapp.com/api/v1/organizations/" + $route.current.params.name
    //                 }).then(function successCallback(response) {
    //                     console.log(response.data);
    //                     defObj.resolve(response.data);
    //                 }, function errorCallback(response) {
    //                     $location.path('/');
    //                 });
    //                 return defObj.promise;
    //             }
    //         }
    //     });


    $locationProvider.html5Mode(true);

}]);