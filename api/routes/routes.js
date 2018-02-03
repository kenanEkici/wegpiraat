'use strict';

var wpController = require('../controllers/wegpiraat-controllers');
var authController = require('../controllers/auth-controller')
var middleware = require('../middleware/middleware');

module.exports = function(app) {    
    
    //CORS
    app.options('*', function(req,res,next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.sendStatus(200);
    })  

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
    app.get('/', function(req,res){ res.render("index.html"); });
    
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
    app.get('/api', wpController.checkStatus);

    app.all('/api/login', app.oauth.grant());
    
    app.post('/api/register', authController.register);
 
    app.get('/secret', middleware.requiresUser, function(req, res) {
        console.log(req.oauth);
    });

    // Oauth Error handler
    app.use(app.oauth.errorHandler());

    // Not found
    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
    });
}