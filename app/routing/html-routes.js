var path = require('path');
var request = require('request');

//ROUTING

module.exports = function(app) {
    app.get('/', function(req,res) {
        res.sendFile(path.join(__dirname, "./../public/main.html"));
    });

    app.get('/:organizationId', function(req,res) {
        var organization = req.params.organizationId;

        //GET request to check to see if it is a valid organization
        var queryString = "https://my-directory-api.herokuapp.com/api/organizations/" + organization;
        request.get(queryString).on('response', function(response) {
           //if exists, check to see if they are logged in (JWT)
                // if logged in serve directory.html with information for company (need another request here with JWT to get company info)
                // else serve login.html with company logo and company name
           // else redirect to main.html
        });

        // res.sendFile(path.join(__dirname, "../public/directory.html"));
    });
};