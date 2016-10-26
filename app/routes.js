

var Nerd = require('./models/nerd');
var path = require('path');

module.exports = function(app) {

    /* SERVER ROUTES ======================= */
    // handle things like api calls
    // authentication routes

    //sample api route
    /*
    app.get('/api/nerds', function (req, res) {

        //do request here
        //find all nerds
        Nerd.find(function(err, nerds) {
            if (err)
                res.send(err);


            //return all nerds in JSON format
            res.json(nerds)
        });
    });
    */

    //route to handle creating goes here (app.post)

    //route to handle delete goes here (app.delete)



    // FRONTEND ROUTES =======================
    //route to handle all angular requests
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

};