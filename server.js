var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//EXPRESS CONFIG
var app = express();
var PORT = process.env.PORT || '3000';

//BODYPARSER
//parse application/json
app.use(bodyParser.json());

//parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method=Override'));

//NOT SURE ON THIS ONE
app.use(bodyParser.text());

//set the static files location
app.use(express.static(__dirname + '/public'));

//routes
require('./app/routes')(app); //configure our routes

//startup the app and shout out to the user
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

// expose app
exports = module.exports = app;