app.controller("DirectoryController", ["$scope", "$state", "$stateParams", "$http", "$sessionStorage", function ($scope, $state, $stateParams, $http, $sessionStorage) {

    var orgId = $stateParams.orgId;
    var token = $stateParams.token;


    var queryString = "https://my-directory-api.herokuapp.com/api/v1/" + orgId + "/contacts";

    if ($sessionStorage.currentUser !== undefined && token !== undefined) {
        $http.get(queryString, {
            headers: {
                "x-access-token": $sessionStorage.currentUser.token || token
            }
        }).then(function successCallback(response) {

            var contactList = response.data.contacts;
            $scope.user = response.data.user;
            $scope.organization = response.data.organization;


            $scope.contacts = contactList.map(function (contact) {
                contact.fullName = `${contact.firstName} ${contact.lastName}`;
                return contact;
            });

        }, function errorCallback() {
            $state.go('login', {orgId: orgId});
        });
    } else {
        $state.go('login', {orgId: orgId});
    }

    $scope.editUser = function() {

    };

    $scope.logout = function() {
        delete $sessionStorage.currentUser;
        $state.go('login', {orgId: orgId});
    }


}]);







// function addUser(url, user) {
//     var queryString = "https://my-directory-api.herokuapp.com/api/v1/" + organization + "/contacts"
// user = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     department: "",
//     title: "",
//     phone: "",
//     extension: ""
//     photoUrl: ""
// }
//     $http.post()
// }
