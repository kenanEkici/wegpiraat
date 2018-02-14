'use strict'

var business = require('../business/business');
var userRepo = require('../models/user');
var User = require('../models/user');

function register(req, res, nev) {    
        var newUser = new User(business.hashPassword(req.body));
        nev.createTempUser(newUser, (err, existingPersistentUser, newTempUser) => {
            if (err) res.status(400).send(err);
            if (existingPersistentUser) res.status(400).send("User with this email-adres already exists");  
            if (newTempUser) {
                var URL = newTempUser[nev.options.URLFieldName];
                nev.sendVerificationEmail(newUser.email, URL, function(err, info) {
                    if (err) res.status(400).send(err);     
                    else res.status(200).send("Email verification has been sent");
                });
            } else {
                res.status(400).send("Email has already been sent, verify or wait 24 hours!"); 
            }
        });     
}

function confirmUser(req, res, nev) {
    nev.confirmTempUser(req.params.url, (err, user) => {
        if (err) res.status(400).send(err + "Redirect to wegpiraat faulty");
        else { 
            if (user) {
                nev.sendConfirmationEmail(user.email, (err, info) => {
                    if (err) res.status(400).send(err + "Redirect to wegpiraat faulty"); 
                    res.status(200).send("Redirect to wegpiraat success")
                });  
            }        
            else res.status(400).send("Redirect to wegpiraat expired or faulty");
        }
    });
}

function resendVerification(req, res, nev) {
    nev.resendVerificationEmail(req.body.email, function(err, userFound) {
        if (err) res.status(400).send(err);
        if (userFound) res.status(200).send("Verification email has been sent");        
        else res.status(400).send("User with email address not found");         
    });
}

function forgotPassword(req, res) {

}

module.exports = {
    register: register,
    confirmUser: confirmUser,
    resendVerification: resendVerification
};