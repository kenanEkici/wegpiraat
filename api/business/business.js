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

module.exports = {
    hashPassword: hashPassword,
    validatePassword: validatePassword,
    checkObjectId: checkObjectId,
    postBelongsToUser: postBelongsToUser,
    commentBelongsToUser: commentBelongsToUser,
    isPostLiked: isPostLiked
};
  
  