//declaring dependencies
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');

//set public accessable files
app.use(express.static('public'))

// options for the swagger docs
var options = {
  swaggerDefinition: {
    info: {
      title: 'Node Swagger API',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'https://kenan-api.herokuapp.com/',
    basePath: '/',
  },
  // path to the API docs
  apis: ['./api/routes/*.js'],
};

// set swagger-jsdoc and route
var swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function(req,res){
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

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