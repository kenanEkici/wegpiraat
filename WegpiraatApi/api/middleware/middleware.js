var models = require('./../models');
var User = models.User;

function requiresUser(req, res, next) {
    res.app.oauth.authorise()(req, res, next);
}

module.exports.requiresUser = requiresUser;