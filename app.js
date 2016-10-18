console.log('loaded');
var myApp = angular.module("myapp", []);

myApp.controller("HelloController", function ($scope) {
    $scope.helloTo = {};
    $scope.helloTo.title = "Ronny";
});

myApp.controller("HeaderCtrl", function ($scope) {
    $scope.appDetails = {
        title: "myDirectory.io",
        name: "Ronny"
    };
});

myApp.controller("ContactListCtrl", function ($scope) {
    $scope.contacts = Contacts.map(function(contact) {
        contact.fullName = `${contact.first_name} ${contact.last_name}`;
        return contact;
    });
    $scope.sendInMail = function (contact) {
        console.log("email to: ", contact);
    }
});
