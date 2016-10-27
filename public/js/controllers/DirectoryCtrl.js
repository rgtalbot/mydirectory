angular.module('DirectoryCtrl', []).controller("DirectoryController", ["$scope", "$state", "$stateParams", "$http", function ($scope, $state, $stateParams, $http) {

    var token = $stateParams.token.token;
    var orgId = $stateParams.orgId;

    var queryString = "https://my-directory-api.herokuapp.com/api/v1/" + orgId + "/contacts";


    $http.get(queryString, {
        headers: {
            "x-access-token": token
        }
    }).then(function successCallback(response) {
        console.log(response);
        var contactList = response.data.contacts;
        $scope.user = response.data.user;
        var organization = response.data.organization;


        $scope.contacts = contactList.map(function(contact) {
            contact.fullName = `${contact.firstName} ${contact.lastName}`;
            return contact;
        });
        $scope.sendInMail = function (contact) {
            console.log("email to: ", contact);
        };


        console.log('success');
    }, function errorCallback(response) {
        console.log('failure');
    });

}]);


// res.render("directory", {contacts: data.contacts, user: data.user, organization: data.organization})
