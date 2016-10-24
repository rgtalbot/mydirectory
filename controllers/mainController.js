var express = require('express');
var contacts = require('../data/contacts');
var request = require('request');
var router = express.Router();

//ROUTING

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/directory', function (req, res) {
    res.render('directory', {data: contacts})
});

router.get("/:organizationId", function (req, res) {
    var organization = req.params.organizationId;
    var queryString = "https://my-directory-api.herokuapp.com/api/v1/organizations/" + organization;
    request.get(queryString).on('response', function( response ) {
        console.log(response.toJSON());
        if (response.statusCode === 200) {

            res.render("login");
        } else {
            res.redirect('/')
        }
    });
});


//CHECKS TO SEE IF URL IS AVAILABLE IN SIGN UP FORM
router.get('/validate', function (req, res) {
    var organization = req.query.url;
    var queryString = "https://my-directory-api.herokuapp.com/api/v1/organizations/" + organization;
    request.get(queryString).on('response', function (response) {
        if (response.statusCode === 200) {
            res.writeHead(400, 'URL Unavailable');
            res.send();
        } else if (response.statusCode === 404) {
            res.sendStatus(200);
        }
    });
});


module.exports = router;


// module.exports = function(app) {
//     app.get('/', function(req,res) {
//         res.sendFile(path.join(__dirname, "./../public/main.html"));
//     });
//
//     app.get('/:organizationId', function(req,res) {
//         var organization = req.params.organizationId;
//
//         //GET request to check to see if it is a valid organization
//         var queryString = "https://my-directory-api.herokuapp.com/api/organizations/" + organization;
//         request.get(queryString).on('response', function(response) {
//            //if exists, check to see if they are logged in (JWT)
//                 // if logged in serve directory.html with information for company (need another request here with JWT to get company info)
//                 // else serve login.html with company logo and company name
//            // else redirect to main.html
//         });
//
//         // res.sendFile(path.join(__dirname, "../public/directory.html"));
//     });
// };