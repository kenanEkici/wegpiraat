//deps
var express = require('express');
var app = express();
var https = require("https");
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var oauthserver = require('node-oauth2-server');
var mongoose = require('mongoose');
var nev = require('email-verification')(mongoose);
var exp = require('./api/constants');
var multer = require('multer');
var business = require('./api/business/business');
var upload = multer({storage:multer.memoryStorage()})

mongoose.connect(process.env.MONGOURL, function(err) {
  console.log("Connected with wegpiraat remote");
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
app.use(express.static('api/public/'))

//set html renderer
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

//bodyparser
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

//routes
var routes = require('./api/routes/routes');
routes(app, nev, upload);

//start server
app.listen(port);
console.log("API started on port " + port );

//uncomment to seed
//var seed = require('./api/seed');
