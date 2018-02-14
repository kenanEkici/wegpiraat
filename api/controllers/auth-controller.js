'use strict'

var business = require('../business/business');
var userRepo = require('../models/user');

function register(req, res, nev) {    
    var newUser = userRepo.createUser(business.hashPassword(req.body));
    nev.createTempUser(newUser, (err, existingPersistentUser, newTempUser) => {
        if (err) res.status(400).send(err);
        else if (existingPersistentUser) res.status(400).send("User with this email-adres already exists");  
        else if (newTempUser) {
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
    userRepo.getUserByEmail(req.body.email, (err, user) => {
        if (err) res.status(400).send(err);
        else {
            if (user) {
                business.sendResetPasswordMail(req.body.email, (err, token) => {
                    if (err) res.status(400).send(err);
                    else {
                        userRepo.forgotPassword(req.body.email, token, business.getTokenExpireDate(), (err, data) => {
                            if (err) res.status(400).send(err);     
                            else res.send("Reset token send to user");                       
                        });
                    }
                });
            } else {
                res.status(400).send("User not found");
            }
        }
    });    
}

function confirmReset(req, res) {
    userRepo.getUserByEmail(req.body.email, (err, user) => {
        if (err) res.status(400).send(err);
        else {
            if (user) {                
                if (err) res.status(400).send(err);
                else {
                    if (business.tokenIsInvalid(user.password_reset_token, req.body.token)) res.status(400).send("Token is not valid");
                    else if (business.tokenHasExpired(user.reset_token_expires)) res.status(400).send("Token has expired");
                    else {
                        var body = business.doubleCheckPassword(req.body);
                        if (!body) res.status(400).send("Passwords do not match");
                        else {
                            userRepo.resetPassword(user.email, body.password, (err, data) => {
                                if (err) res.status(400).send(err);
                                else res.send("Password has been reset");
                            });
                        }
                    }
                }              
            } else {
                res.status(400).send("User not found");
            }
        }
    });    
}

function resetPassword(req, res) {
    userRepo.getUserById(req.oauth.bearerToken.userId, (err, user) => { 
        if (err) res.status(400).send(err);
        else {
            var body = business.doubleCheckPassword(req.body);
            if (!body) res.status(400).send("Passwords do not match");
            else {
                userRepo.resetPassword(user.email, body.password, (err, data) => {
                    if (err) res.status(400).send(err);
                    else res.send("Password has been reset");
                });
            }
        }
    });
}

module.exports = {
    register: register,
    confirmUser: confirmUser,
    resendVerification: resendVerification,
    resetPassword: resetPassword,
    forgotPassword: forgotPassword,
    confirmReset: confirmReset
};