$(document).ready(function () {


//JQUERY DOWN HERE
    function ajax_call() {
        var organization = $('#companyName').val().toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/gi, "");
        console.log(organization);


        var string = organization;
        var length = 20;
        var trimmedString = string.length > length ?
            string.substring(0, 20) :
            string;

        console.log(trimmedString);
        $("#url").val(trimmedString);

    }

    $("#signUpModal").on("hidden.bs.modal", function () {
        $("#signUpForm")[0].reset();
    });


    $("#signUpForm").validator().on('submit', function (e) {
        if (e.isDefaultPrevented()) {
            console.log(e.isDefaultPrevented());
            var testCompany = {
                name: "fake name",
                address: "123 Main St",
                city: "Orlando",
                state: "FL",
                zip: "34787",
                directoryUrl: "testmeout",
                email: "rgtalbot@gmail.com",
                password: "test314",
                firstName: "Ryan",
                lastName: "Talbot",
                title: "Form Validation Master",
                department: "Fucking Boss",
                phone: "4073258449",
                extension: ""
            };


            console.log(testCompany);

            $.post("/api/new", testCompany, function (data) {
                if (data.success)
                    console.log('success');
                else
                    console.log(data);
            });

            // window.location.replace('/deathstar');
        } else {
            $("#submit").show();
            //submit that shiz
            var company = $('#companyName').val().trim();
            var url = $("#url").val().trim();
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
                ext: ext
            };


            $("#signUpForm")[0].reset();
            return false;
        }
    });
});