var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//EXPRESS CONFIG
var app = express();
var PORT = process.env.PORT || '3000';

//BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());

app.use(express.static(process.cwd() + '/public'));

//override POST with ?_method=
app.use(methodOverride("_method"));

//HANDLEBARS
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//ROUTING
var routes = require('./controllers/mainController');
app.use('/', routes);

//LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});