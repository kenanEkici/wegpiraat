'use strict'

var business = require('../business/business');
var userRepo = require('../models/user');

function register(req, res, nev) {    
    //todo: validate user information in business class
    var newUser = userRepo.createUser(business.hashPassword(req.body));
    //if successful
    nev.createTempUser(newUser, (err, userExists, newTempUser) => {
        if (err) res.status(400).send(err); //failsafe
        else if (userExists) res.status(400).send("User with email " +newUser.email+ " already exists");  
        else if (newTempUser) {
            var URL = newTempUser[nev.options.URLFieldName];
            nev.sendVerificationEmail(newUser.email, URL, function(err, info) {
                if (err) res.status(400).send(err); //failsafe    
                else res.status(200).send("Email verification has been sent to " + newUser.email);
            });
        } else {
            res.status(400).send("Email has already been sent to " +newUser.email+ ", verify or wait 24 hours to try again!"); 
        }
    });
}

function confirmUser(req, res, nev) {
    nev.confirmTempUser(req.params.url, (err, user) => {
        if (err) res.status(400).send(err + "Redirect to wegpiraat faulty"); //failsafe
        else { 
            if (user) {
                nev.sendConfirmationEmail(user.email, (err, info) => {
                    if (err) res.status(400).send(err + "Redirect to wegpiraat faulty"); //failsafe
                    res.status(200).send("Redirect to wegpiraat success")
                });  
            }        
            else res.status(400).send("URL for verification is faulty, please re-send a verification email!");
        }
    });
}

function resendVerification(req, res, nev) {
    //todo: avoid spamming a resend
    nev.resendVerificationEmail(req.body.email, function(err, userFound) {
        if (err) res.status(400).send(err); //failsafe
        else if (userFound) res.status(200).send("Verification email has been re-sent to " + req.body.email);        
        else res.status(400).send("User with email address " +req.body.email+ " not found"); 
    });
}

function forgotPassword(req, res) {
    userRepo.getUserByEmail(req.body.email, (err, user) => {
        if (err) res.status(400).send(err); //failsafe
        else {
            if (user) {
                business.generatePasswordResetToken((err, token) => {
                    if (err) res.status(400).send(err); //failsafe
                    else {
                        business.sendResetPasswordMail(req.body.email, token, (err, token) => {
                            if (err) res.status(400).send(err); //failsafe
                            else {
                                userRepo.forgotPassword(req.body.email, token, business.getTokenExpireDate(), (err, data) => {
                                    if (err) res.status(400).send(err); //failsafe
                                    else res.send("Reset token send to user with email " + req.body.email);                       
                                });
                            }
                        });
                    }
                });                
            } else {
                res.status(400).send("User with email " +req.body.email+ " not found");
            }
        }
    });    
}

function confirmReset(req, res) {
    userRepo.getUserByEmail(req.body.email, (err, user) => {
        if (err) res.status(400).send(err); //failsafe
        else {
            if (user) { 
                if (business.tokenIsInvalid(user.password_reset_token, req.body.token)) res.status(400).send("Reset token is not valid");
                else if (business.tokenHasExpired(user.reset_token_expires)) res.status(400).send("Reset token has expired");
                else {
                    var body = business.doubleCheckPassword(req.body); //returns a hashed password!!!
                    if (!body) res.status(400).send("Passwords do not match");
                    else {
                        userRepo.resetPassword(user.email, body.password, (err, data) => {
                            if (err) res.status(400).send(err); //failsafe
                            else res.send("Password of user " +user.email+ " has been reset");
                        });
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
        if (err) res.status(400).send(err); //failsafe
        else {
            var body = business.doubleCheckPassword(req.body); //password is hashed!!!!
            if (!body) res.status(400).send("Passwords do not match");
            else {
                userRepo.resetPassword(user.email, body.password, (err, data) => {
                    if (err) res.status(400).send(err);
                    else res.send("Password of user " +user.email+ " has been reset");
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