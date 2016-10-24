var express = require('express');
var contacts = require('../data/contacts');
var request = require('request');
var router = express.Router();

//ROUTING

router.get('/', function (req, res) {
    res.render('index');
});

router.post('/login', function (req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
    var directoryUrl = 'deathstar';
    var queryString = "https://my-directory-api.herokuapp.com/api/auth/"+directoryUrl+"/login";
    request.post(queryString, [req.body.username, req.body.password], function ( error, response, body) {
        console.log(response.statusCode);
        console.log(body);

        if (response.statusCode == 200) {
            res.render('directory', {data: contacts})
        } else {
            res.redirect("/deathstar")
        }
    });
});

router.get("/:organizationId", function (req, res) {
    var organization = req.params.organizationId;
    var queryString = "https://my-directory-api.herokuapp.com/api/v1/organizations/" + organization;
    request.get(queryString, function (error, response, body) {
        var bodyParsed = JSON.parse(body);
        console.log(bodyParsed);
        var organization = {
            name: bodyParsed.organization.name,
            logo: bodyParsed.organization.logoUrl
        };

        if (!error && response.statusCode == 200) {
            res.render("login", organization);
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