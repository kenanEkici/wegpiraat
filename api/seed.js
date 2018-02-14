var models = require('./models/auth/oauth_client');
var exp = require('../api/constants');

models.create(exp.clientSeed);
