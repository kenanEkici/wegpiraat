'use strict';

module.exports = function(app) {
    var hcontroller = require('../controllers/hero-controller');
    var oAuthModels = require('../models');
    var middleware = require('../middleware/middleware');
    
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
        hcontroller.checkStatus(req,res);
    });

    /**
     * @swagger
     * /api/wegpiraat:
     *   get:
     *     tags:
     *       - wegpiraat root
     *     description: Root
     *       - application/json
     *     responses:
     *       200:
     *         description: Return test json to check if API is working
     */
    app.get('/api/wegpiraat', function (req,res) {
        hcontroller.checkStatus(req,res);
    });   

    app.get('/api/heroes', function (req,res) {
        hcontroller.getAllHeroes(req,res);
    }); 

    app.get('/api/heroes/:id', function (req,res) {
        hcontroller.getHeroByName(req,res);
    }); 

    app.post('/api/heroes', function (req,res) {
        hcontroller.createHero(req,res);
    });   
    
    app.delete('/api/heroes/:id', function (req, res) {
        hcontroller.deleteHeroByName(req,res);
    })

    app.put('/api/heroes/:id', function(req,res){
        hcontroller.updateHeroByName(req,res);
    })      
    
    app.all('/login', app.oauth.grant());
    
    app.post('/register', function(req,res) {
        oAuthModels.User.register(req.body, function(err, user) {
            if (err) res.send(err);
                res.send(user);
          });
    });

    app.use(app.oauth.errorHandler());

    app.get('/secret', middleware.requiresUser, function(req, res) {
        console.log(req.oauth);
    });

    //joker
    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
    });
}