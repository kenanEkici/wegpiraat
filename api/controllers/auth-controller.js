'use strict'

var business = require('../business/business');
var userRepo = require('../models/user');

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