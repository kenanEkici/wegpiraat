'use strict';

var wpController = require('../controllers/wegpiraat-controllers');
var authController = require('../controllers/auth-controller')

module.exports = function(app) {    
    
    //CORS
    app.options('*', function(req,res,next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.sendStatus(200);
    })
    
    //unprotected routes

    app.get('/', (req,res) => res.render("index.html"));
    
    app.get('/api', wpController.checkStatus);

    app.post('/api/register', authController.register);

    app.post('/api/login', app.oauth.grant()); 
    
    app.post('/api/auth', app.oauth.authCodeGrant());
  
    //protected routes 

    //masters
    app.get('/api/wegpiraten', app.oauth.authorise(), wpController.getAllWegpiraten);

    //details
    app.get('/api/wegpiraten/:postId', app.oauth.authorise(), wpController.getWegpiraatById);

    //add wegpiraat
    app.post('/api/wegpiraten', app.oauth.authorise(), wpController.addWegpiraat);    

    //update wegpiraat
    app.put('/api/wegpiraten/:postId', app.oauth.authorise(), wpController.updateWegpiraatById);

    //delete wegpiraat
    app.delete('/api/wegpiraten/:postId', app.oauth.authorise(), wpController.deleteWegpiraatById);

    //add comment
    app.post('/api/wegpiraten/:postId/comment', app.oauth.authorise(), wpController.addCommentToPost);

    //delete comment
    app.delete('/api/wegpiraten/:postId/:commentId', app.oauth.authorise(), wpController.deleteCommentFromPost);

    //like post
    app.post('/api/wegpiraten/:postId/like', app.oauth.authorise(), wpController.addOrRemoveLikeToPost);

    // Not found
    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
    });
}