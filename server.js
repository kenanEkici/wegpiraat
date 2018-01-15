//declaring dependencies
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser');

//set html renderer
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

//set mongodb
MongoClient.connect('', (err, database) => {
  console.log("connected to mongodb");
})

//set routes
var routes = require('./api/routes/routes');
routes(app);

//set parser
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

//start server
app.listen(port);
console.log("API started on port " + port );