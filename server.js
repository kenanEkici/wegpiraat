//dependencies
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');
var oauthserver = require('node-oauth2-server');
var oAuthModels = require('./api/models/auth/oauth');
var mongoose = require('mongoose');
var nev = require('email-verification')(mongoose);

mongoose.connect('mongodb://localhost/wegpiraat', function(err) {
  console.log("Connected with wegpiraat database");
});

var User = require('./api/models/user');

//oauth server
app.oauth = oauthserver({
  model: oAuthModels,
    grants: ['password', 'refresh_token'],
    debug: false
});

//email server
nev.configure({
  verificationURL: 'http://localhost:3000/api/verify/${URL}',
  persistentUserModel: User,
  tempUserCollection: 'tempusers',

  transportOptions: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'noreply.wegpiraat@gmail.com',
        pass: 'wegpiraat123'
    }
  },
  verifyMailOptions: {
      from: 'Do Not Reply <wegpiraat@wegpiraat.com>',
      subject: 'Bevestig je account voor Wegpiraat',
      html: "<p><a href=${URL}>Klik hier</a> om je account te bevestigen:</p>",
      text: 'Klik hier om je account te bevestigen: ${URL}'
  },
  shouldSendConfirmation: false,
  confirmMailOptions: {
    from: 'Do Not Reply <user@gmail.com>',
    subject: 'Uw Wegpiraat account is geverifieerd!',
    html: '<p>U kunt inloggen op Wegpiraat.</p>',
    text: 'U kunt inloggen op Wegpiraat'
  }    
}, function(error, options){
  console.log(error);
});

nev.generateTempUserModel(User, function(err, tempUserModel) {
  if (err) console.log(err); return;
  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
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

//bodyparser
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

//routes
var routes = require('./api/routes/routes');
routes(app, nev);

//start server
app.listen(port);
console.log("API started on port " + port );

//uncomment to seed
//var seed = require('./api/seed');

//error handler for oauth2 
app.use(app.oauth.errorHandler());
