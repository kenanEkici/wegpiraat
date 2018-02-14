var AuthCode = require('./authcode');
var AccessToken = require('./accesstoken');
var RefreshToken = require('./refreshtoken');
var Client = require('./client');
var User = require('../user');

module.exports.getAuthCode = AuthCode.getAuthCode;
module.exports.saveAuthCode = AuthCode.saveAuthCode;
module.exports.getAccessToken = AccessToken.getAccessToken;
module.exports.saveAccessToken = AccessToken.saveAccessToken;
module.exports.saveRefreshToken = RefreshToken.saveRefreshToken;
module.exports.getRefreshToken = RefreshToken.getRefreshToken;
module.exports.getUser = User.validateAccount;
module.exports.getClient = Client.getClient;
module.exports.grantTypeAllowed = Client.grantTypeAllowed;
