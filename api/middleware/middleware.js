function requiresUser(req, res, next) {
    res.app.oauth.authorise()(req, res, next);
}

function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

module.exports = {
    requiresUser: requiresUser
};