'use strict'

var business = require('../business/business');
var userRepo = require('../models/user');

/* USER should be able to:
PRE_ACCOUNT
    // Register before validating
    // Validate e-mail account 
    // Login with their credentials after validation
POST_ACCOUNT
    // Recover username with e-mail account
    // Reset password with e-mail account
*/

/* USER shouldnt be able to:
PRE_ACCOUNT
    // Register with faulty or forbidden characters
    // Register with same e-mail account
    // Register with same e-mail account being validated
    // Login before e-mail validation
    // Login after e-mail validation has expired
POST_ACCOUNT
    // Reset password multiple times in a week
*/

function register(req,res) {
    userRepo.createUser(business.hashPassword(req.body), (err, data) => {
        if (err)
            res.status(400).send(err);
        else 
            res.send(data);        
    });
}

module.exports = {
    register: register
};