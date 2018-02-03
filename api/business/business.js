'use strict';

var bcrypt = require('bcrypt');
var crypto = require('crypto');

function hash(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function hashPassword(body) {
    body.hashed_password = hash(body.password);
    delete body.password; 
    return body;     
}

function validatePassword(password, hashed) {
    return bcrypt.compareSync(password, hashed);
}

module.exports = {
    hashPassword: hashPassword,
    validatePassword: validatePassword
};
  
  