//dependencies
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');
var oauthserver = require('node-oauth2-server');
var oAuthModels = require('./api/models/auth/oauth');
var mongoose = require('mongoose');

//oauth server
app.oauth = oauthserver({
  model: oAuthModels,
    grants: ['password', 'authorization_code', 'refresh_token'],
    debug: false
});

//public files
app.use(express.static('public'))

//swagger docs
var options = {
  swaggerDefinition: {
    info: {
      title: 'Kenan\'s wonderful API of surprises',
      version: '1.0.0',
      description: 'Hi, you have found my REST API! You must feel so damn good about yourself huh.',
    },
    host: 'kenan-api.herokuapp.com',
    basePath: '/',
  },
  // path to the API docs
  apis: ['./api/routes/*.js'],
};

// swaggerdoc route
var swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function(req,res){
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

//set html renderer
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

//start mongoose database
mongoose.connect('mongodb://localhost/wegpiraat', function(err) {
  console.log("Connected with wegpiraat database");
});

//bodyparser
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

//routes
var routes = require('./api/routes/routes');
routes(app);

//start server
app.listen(port);
console.log("API started on port " + port );

//uncomment to seed
//var seed = require('./api/seed');

//error handler for oauth2 
app.use(app.oauth.errorHandler());
