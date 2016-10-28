app.controller("MainController", ["$scope", "$http", "$state", function ($scope, $http, $state, $setValidity) {

    $scope.tagline = 'To the moon and back!';
    console.log($scope.tagline);

    $scope.urlValidate = function ($setValidity, str) {
        var organization = $scope.urlName || str;

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

    $scope.ajax_call = function () {
        var organization = $scope.companyName.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/gi, "");

        var string = organization;
        var length = 20;
        var trimmedString = string.length > length ?
            string.substring(0, 20) :
            string;

        $scope.urlName = trimmedString;
        $scope.urlValidate($setValidity, trimmedString);
    };

    $("#signUpModal").on("hidden.bs.modal", function () {
        $("#signUpForm")[0].reset();
    });


    $("#signUpForm").validator().on('submit', function (e) {
        if (e.isDefaultPrevented()) {
            console.log(e.isDefaultPrevented());

        } else {
            $("#submit").show();
            //submit that shiz
            var company = $('#companyName').val().trim();
            var url = $("#urlName").val().trim();
            var address = $('#address').val().trim();
            var city = $('#city').val().trim();
            var state = $("#state").val().trim();
            var zip = $("#zip").val().trim();
            var email = $("#email").val().trim();
            var password = $("#password").val().trim();
            var firstName = $("#firstName").val().trim();
            var lastName = $("#lastName").val().trim();
            var title = $('#title').val().trim();
            var department = $("#department").val().trim();
            var phone = $("#phone").val().trim();
            var ext = $("#ext").val().trim();


            var newCompany = {
                name: company,
                address: address,
                city: city,
                state: state,
                zip: zip,
                directoryUrl: url,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                title: title,
                department: department,
                phone: phone,
                extension: ext
            };


            $("#signUpForm")[0].reset();


            $.post("/api/new", newCompany).then(function (data) {
                console.log(data);
                if (data.success) {

                    console.log("success");
                    $state.go("/" + newCompany.directoryUrl + "/directory", {token: data.token});

                } else {
                    console.log(data);
                    console.log('fail')
                }
                // $http.post('/api/new', newCompany, function(data) {
                //     console.log(data);
                //    if (data.success) {
                //        console.log('success');
                //
                //    } else {
                //        //handle failure here
                //        console.log('fail');
                //    }
                // });

            });
        }
    });
}]);