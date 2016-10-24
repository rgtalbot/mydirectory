function ajax_call() {
    var organization = $('#companyName').val().toLowerCase().replace(/\s/g, '-');
    console.log(organization);
    $("#url").val(organization);
}

$("#signUpModal").on("hidden.bs.modal", function () {
    $("#signUpForm")[0].reset();
});

$("#signUpForm").validator().on('submit', function (e) {
    if (e.defaultPrevented) {
        //form not valid
    } else {
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
            directoryUrl: "https://mydirectory-io.herokuapp.com/" + url,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            title: title,
            department: department,
            phone: phone,
            ext: ext
        };

        $.post("https://my-directory-api.herokuapp.com/api/auth/register", newCompany, function (result) {
            console.log(result)
        }).done(function () {
            alert('success');
        });

        $("#signUpForm")[0].reset();
        return false;
    }
});
