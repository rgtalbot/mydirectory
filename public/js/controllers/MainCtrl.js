app.controller("MainController", ["$scope", "$http", function ($scope, $http, $setValidity) {

    $scope.tagline = 'To the moon and back!';
    console.log($scope.tagline);

    $scope.urlValidate = function ($setValidity) {
        var organization = $scope.urlName;

        var queryString = "https://my-directory-api.herokuapp.com/api/v1/organizations/" + organization;

        $http.get(queryString).then(function successCallback(response) {
            console.log('not available');
            $scope.signUpForm.urlName.$setValidity("taken", false);
            $scope.signUpForm.urlName.$setValidity("available", true);
        }, function errorCallback(response) {
            console.log('available');
            $scope.signUpForm.urlName.$setValidity("available", false);
            $scope.signUpForm.urlName.$setValidity("taken", true);
        })

    };

    $scope.companyChange = function () {
        console.log('length', $scope.companyName.length);
        var company = $scope.companyName.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/gi, "");
        console.log(company);

        var string = company;
        var length = 20;
        var trimmedString = string.length > length ?
            string.substring(0, 20) :
            string;

        $scope.urlName = trimmedString;
        $scope.urlValidate($setValidity);

    };

    //     // $http.post('/api/new', newCompany).then(function(){}, function(){});
    // }

}]);