'use strict';

module.exports = function(app) {
    var controllers = require('../controllers/controllers.js');
    
    app.get('/', function(req,res){
        res.render("index.html");
    });
    
    app.get('/api', function (req,res) {
        res.send(controllers.getData(req,res));
    });

    //joker
    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
    });
}