var express = require('express');
var contacts = require('../data/contacts');
var request = require('request');
var localStorage = require('localStorage');
var router = express.Router();

//ROUTING

router.get('/', function (req, res) {
    res.redirect('/home');
});

router.get('/home', function (req, res) {
    res.render('index')
});


router.post('/:organizationId/login', function (req, res) {

    var directoryUrl = req.params.organizationId;

    var queryString = "https://my-directory-api.herokuapp.com/api/auth/" + directoryUrl + "/login";
    var redirectString = "/" + directoryUrl;

    request({
        url: queryString,
        method: "POST",
        form: {
            email: req.body.username,
            password: req.body.password
        }
    }, function (error, response, body) {
        var parsed = JSON.parse(body);
        console.log("token", parsed.token);

        if (response.statusCode === 200) {
            localStorage.setItem('token', parsed.token);
            res.redirect('/' + directoryUrl + '/directory');
        } else {
            res.redirect(redirectString);
        }
    });
});

router.get('/:organizationId/directory', function(req, res) {
    var queryString = "https://my-directory-api.herokuapp.com/api/v1/" + req.params.organizationId + "/contacts";
    request({
        url: queryString,
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem('token')
        }
    }, function (error, response, body) {
        if (response.statusCode == 200) {
            console.log("FUCK RONNY")
        }
    });
});


//CHECKS TO SEE IF URL IS AVAILABLE IN SIGN UP FORM
router.get('/validate', function (req, res) {
    var organization = req.query.url;
    console.log('check');
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

router.post('/new', function(req, res) {
   request.post("https://my-directory-api.herokuapp.com/api/auth/register", req.body , function (error, response, body) {}).on('response', function() {
       console.log(req.body.url);
   });

    res.redirect('/home');
});

router.get("/:organizationId?", function (req, res) {
    var organization = req.params.organizationId;

    var queryString = "https://my-directory-api.herokuapp.com/api/v1/organizations/" + organization;
    request.get(queryString, function (error, response, body) {
        console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            var bodyParsed = JSON.parse(body);
            var orgInfo = {
                name: bodyParsed.organization.name,
                logo: bodyParsed.organization.logoUrl,
                orgId: organization
            };
            res.render("login", orgInfo);

        } else {
            res.redirect('/home')
        }
    });
});


module.exports = router;
