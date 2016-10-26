angular.module('signUpCtrl', []).directive("signupDirective", ['$http', function($http) {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value !== "deathstar") {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    }
}]);







//     .controller("signUpController", function($scope, $q, $timeout) {
//
//     $scope.formsValid=false;
//
//     $scope.checkout = function() {
//         if($scope.signUpForm.$valid) {
//             //connect with the server
//         }
//         $scope.formsValid = $scope.signUpForm.$valid;
//     };
//
//     $scope.registerFormScope = function(form, id) {
//         $scope.parentForm['childForm' + id] = form;
//     };
//
//     $scope.validateChildForm = function(form, data) {
//         //reset the forms so they are no longer valid
//         $scope.formsValid = false;
//         var deferred = $q.defer();
//
//         $timeout(function() {
//
//             if (data.urlName === 'deathstar') {
//                 return deferred.reject(['urlName']);
//             }
//
//             deferred.resolve();
//         });
//         return deferred.promise;
//     }
//
// });