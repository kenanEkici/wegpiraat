'use strict';

var bcrypt = require('bcrypt');
var crypto = require('crypto');
var ObjectId = require('mongoose');

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

function checkObjectId(id) {
    return ObjectId.Types.ObjectId.isValid(id);
}

module.exports = {
    hashPassword: hashPassword,
    validatePassword: validatePassword,
    checkObjectId: checkObjectId
};
  
  