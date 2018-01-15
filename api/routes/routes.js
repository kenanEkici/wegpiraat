'use strict';

module.exports = function(app) {
    var controllers = require('../controllers/controllers.js');
    
    /**
     * @swagger
     * /:
     *   get:
     *     tags:
     *       - API DOC
     *     description: Documentation for the API
     *       - html
     *     responses:
     *       200:
     *         description: Swagger html doc
     */
    app.get('/', function(req,res){
        res.render("index.html");
    });
    
    /**
     * @swagger
     * /api:
     *   get:
     *     tags:
     *       - API root
     *     description: Root
     *       - application/json
     *     responses:
     *       200:
     *         description: Return test json to check if API is working
     */
    app.get('/api', function (req,res) {
        res.send(controllers.checkStatus());
    });

    //joker
    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
    });
}