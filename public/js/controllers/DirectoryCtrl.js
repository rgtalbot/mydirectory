angular.module('DirectoryCtrl', []).controller("DirectoryController", function ($scope, data) {

    $scope.details = data.organization;

});