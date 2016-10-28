var express = require('express');
var path = require('path');
var request = require('request');
var router = express.Router();


var myDirectory = "https://my-directory-api.herokuapp.com/api/v1/";


//SIGN UP FORM POST AND REDIRECT
router.post('/api/new', function (req, res) {
    console.log('here?');
    console.log(req.body);
    request.post(myDirectory + "auth/register", function (error, response, body) {
        if (error)
            console.log(error);
    });

    // res.redirect('*');
});


//route to handle delete goes here (app.delete)


// FRONTEND ROUTES =======================
//route to handle all angular requests
router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;