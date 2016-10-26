var express = require('express');
var contacts = require('../data/contacts');
var request = require('request');
var localStorage = require('localStorage');
var router = express.Router();

var myDirectory = "https://my-directory-api.herokuapp.com/api/v1/";

//ROUTING


//REDIRECT TO HOME PAGE
router.get('/', function (req, res) {
    res.redirect('/home');
});


//RENDER THE HOME PAGE
router.get('/home', function (req, res) {
    res.render('index')
});

//THE POST TO LOGIN AND GET A JWT TO REDIRECT WITH
router.post('/:organizationId/login', function (req, res) {

    var directoryUrl = req.params.organizationId;

    var queryString = myDirectory + "auth/" + directoryUrl + "/login";

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

//THE COMPANY DIRECTORY ROUTE IF LOGGED IN
router.get('/:organizationId/directory', function(req, res) {
    var queryString = myDirectory + req.params.organizationId + "/contacts";
    request({
        url: queryString,
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem('token')
        }
    }, function (error, response, body) {
        var data = JSON.parse(body);
        if (!error && response.statusCode == 200) {
            res.render("directory", {contacts: data.contacts, user: data.user, organization: data.organization})
        }
    });
});


//CHECKS TO SEE IF URL IS AVAILABLE IN SIGN UP FORM
router.get('/validate', function (req, res) {
    var organization = req.query.url;
    console.log('check');
    var queryString = myDirectory + "organizations/" + organization;
    request.get(queryString).on('response', function (response) {
        if (response.statusCode === 200) {
            res.writeHead(400, 'URL Unavailable');
            res.send();
        } else if (response.statusCode === 404) {
            res.sendStatus(200);
        }
    });
});


//SIGN UP FORM POST AND REDIRECT
router.post('/new', function(req, res) {
   request.post(myDirectory + "auth/register", req.body , function (error, response, body) {}).on('response', function() {
       console.log(req.body.url);
   });

    res.redirect('/home');
});


//DUMMY FILE PATH TO EDIT DIRECTORY
router.get('/dummydirectory', function (req,res) {
    res.render("directory", {employees: contacts, user: {
        first_name: "Ryan",
        last_name: "Talbot",
        department: "Front-end",
        jobTitle: "Front End Wizard",
        phone: "(407) 325-8449",
        img: "https://avatars0.githubusercontent.com/u/18399341?v=3&s=466",
        ext: "n/a",
        email: "rgtalbot@gmail.com",
        admin: true
    }, company: {
            name: "FUCK RONNY"
    }})
});

//GETTING TO A SPECIFIC COMPANY PAGE
router.get("/:organizationId?", function (req, res) {
    var organization = req.params.organizationId;

    var queryString = myDirectory + "organizations/" + organization;
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
