function ajax_call() {
    var organization = $('#companyName').val().toLowerCase().replace(/\s/g, '-');
    console.log(organization);
    $("#url").val(organization);
    var queryString = "https://my-directory-api.herokuapp.com/api/organizations/" + organization;

    $.get(queryString, function( data , status ) {
        // Do stuff with the data here by checking the response code.
        console.log(status);
    });

}

$("#signUpModal").on("hidden.bs.modal", function() {
    $("#signUpForm")[0].reset();

});