var models = require('./models/auth/client');
var exp = require('../api/constants');

models.create(exp.clientSeed);
