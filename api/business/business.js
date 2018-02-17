'use strict';

var bcrypt = require('bcrypt');
var crypto = require('crypto');
var ObjectId = require('mongoose');
const nodemailer = require('nodemailer');
var exp = require('../constants');

function hash(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function hashEmail(email) {
    return crypto.randomBytes(12).toString('hex');
}

function hashPassword(body) {
    body.hashed_password = hash(body.password);
    delete body.password; 
    return body;     
}

function doubleCheckPassword(body) {
    if (body.password && body.password === body.confirm) {
        body.password = hash(body.password);
        delete body.confirm;
        return body;
    }
    return false;
}

function validatePassword(password, hashed) {
    return bcrypt.compareSync(password, hashed);
}

function checkObjectId(id) {
    return ObjectId.Types.ObjectId.isValid(id);
}

function postBelongsToUser(postId, user) {    
    var posts = user.posts;
    for (var i = 0; i < posts.length; ++i)      
        if (posts[i].toString() === postId) return true;  
    return false;
}

function commentBelongsToUser(commentId, user) {
    var comments = user.comments;
    for (var i = 0; i < comments.length; ++i) 
        if (comments[i].commentId.toString() === commentId) return true;  
    return false;
}

function isPostLiked(postId, user) {
    var likes = user.likes;
    for (let i = 0; i < likes.length; ++i) 
        if (likes[i].toString() === postId) return true;
    return false;
}

function generatePasswordResetToken(cb) {
    crypto.randomBytes(8, (err, buf) =>{
        if (err) cb(err, null);
        else cb(null, buf.toString('hex'));        
    });    
}

function sendResetPasswordMail(email, token, cb) {
    let transporter = nodemailer.createTransport(exp.mailer);
    let mailOptions = exp.resetPasswordMail(email, token);          
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return cb(error,null);
        else cb(null, token);
    });
}

function tokenIsInvalid(userToken, givenToken) {
    if (userToken !== null && userToken === givenToken) return false
    return true;
}

function tokenHasExpired(expireDate) {
    if (expireDate !== null && expireDate < new Date()) return true;
    else return false;
}

function getTokenExpireDate() {
    return new Date(new Date().getTime() + 20 * (60 * 1000))
}

function userDao(user) {
    if (user !== null) {
        user._id = null;
        user.hashed_password = null;
        return user;
    }
}


module.exports = {
    hashPassword: hashPassword,
    validatePassword: validatePassword,
    checkObjectId: checkObjectId,
    postBelongsToUser: postBelongsToUser,
    commentBelongsToUser: commentBelongsToUser,
    isPostLiked: isPostLiked,
    doubleCheckPassword: doubleCheckPassword,
    sendResetPasswordMail: sendResetPasswordMail,
    generatePasswordResetToken: generatePasswordResetToken,
    tokenIsInvalid: tokenIsInvalid,
    tokenHasExpired: tokenHasExpired,
    getTokenExpireDate: getTokenExpireDate,
    userDao: userDao,
    hashEmail: hashEmail
};
  
  