//deps
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');
var oauthserver = require('node-oauth2-server');
var mongoose = require('mongoose');
var nev = require('email-verification')(mongoose);
var exp = require('./api/constants');

mongoose.connect('mongodb://localhost/wegpiraat', function(err) {
  console.log("Connected with wegpiraat database");
});

var User = require('./api/models/user');

//oauth server
app.oauth = oauthserver(exp.oauth);

//email server
nev.configure({
  verificationURL: exp.verUrl,
  expirationTime: exp.verExpirationTime,
  persistentUserModel: User,
  tempUserCollection: exp.tempuserCollection,
  transportOptions: exp.mailer,
  verifyMailOptions: exp.verifyMail,
  shouldSendConfirmation: false,
  confirmMailOptions: exp.confirmMail    
}, function(err, opts){
    if (err) console.log(err);
});

nev.generateTempUserModel(User, function(err, tempUserModel) {
  if (err) console.log(err); return;
  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});

//public files
app.use(express.static('public'))

// swaggerdoc route
var swaggerSpec = swaggerJSDoc(exp.swagger);
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
