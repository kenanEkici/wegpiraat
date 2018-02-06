'use strict';

var business = require('../business/business');
var wpRepo = require('../models/wegpiraat');
var authRepository = require('../models/user');

function checkStatus(req,res) {
    res.json({status : "up" });
}

//Get all posts
function getAllWegpiraten(req,res) {
    wpRepo.getAllWegpiraten(data => res.send(data));
}

//Get a post by a given id ==> if wegpiraat not found, delete from own list of reference
function getWegpiraatById(req,res) {    
    wpRepo.getWegpiraatById(req.params.postId, (err, data) => {
        if (err) res.status(400).send(err);
        res.send(data);      
    });
}

//Add a post => if success => add reference to user
function addWegpiraat(req,res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => { 
        if (err) { res.status(400).send(err); }
        wpRepo.createWegpiraat(req.body, user, (err, post) => { //add post
            if (err) { res.status(400).send(err); }
            else { 
                authRepository.addWegpiraat(post._id, user, (err, user) => { //adds reference
                    if (err) { res.status(400).send(err); }
                    else res.send(post); //returns the post
                });
            }
        });
    });    
}

//Delete a post by a given id and correct auth => if success => delete from the user
function deleteWegpiraatById(req,res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => { 
        if (err) { res.status(400).send(err); }
        if (!business.postBelongsToUser(req.params.postId, user)) { res.sendStatus(403); } //unauthorized 
        else {  //authorized
            wpRepo.deleteWegpiraatById(req.params.postId, (err, postId) => { //delete post
                if (err) { res.status(400).send(err); }
                else {
                    authRepository.deleteWegpiraatById(postId, user, (err, data) => { //delete reference
                        if (err) { res.status(400).send(err); }
                        else res.send(data); //returns the confirmation
                    });
                }
            });
        }        
    });    
}

//Update a post by a given id and correct auth
function updateWegpiraatById(req,res) {
    wpRepo.updateWegpiraat(req.params.id, req.body, data => {
        if (err) res.status(400).send(err);
        else res.send(data);
    });
}

//Add a comment to a post => if success => add a reference to the user
function addCommentToPost(req,res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => {
        if (err) { res.status(400).send(err); }
        wpRepo.addCommentToPost(req.params.postId, req.body, user, (err, comment) => { //add comment
            if (err) { res.status(400).send(err); }
            else { 
                authRepository.addComment(req.params.postId, comment._id, user, (err, user) => { //add reference
                    if (err) res.status(400).send(err);
                    else res.send(comment); //return added comment
                });
            }
        });
    });
}

//Delete a comment from a post if authorized => if success => remove a reference to the user
function deleteCommentFromPost(req,res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => {
        if (err) { res.status(400).send(err); }
        if (!business.commentBelongsToUser(req.params.commentId, user)) { res.sendStatus(403); } //unauthorized
        else {
            wpRepo.deleteCommentFromPost(req.params.postId, req.params.commentId, (err, commentId) => { //returns the commentId
                if (err) { res.status(400).send(err); }
                else {
                    authRepository.deleteComment(req.params.postId, commentId, user, (err, data) => { //removes the returned commentId 
                        if (err) res.status(400).send(err);
                        else res.send(data); //returns the confirmation
                    });
                }
            });
        }       
    });
}

//Add a like to a post or remove if already liked => if success => add/delete reference to user 
function addOrRemoveLikeToPost(req, res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => {
        //todo
    });
}

module.exports = {
    checkStatus: checkStatus,
    addWegpiraat: addWegpiraat,
    getAllWegpiraten: getAllWegpiraten,
    getWegpiraatById: getWegpiraatById,
    updateWegpiraatById: updateWegpiraatById,
    deleteWegpiraatById: deleteWegpiraatById,
    addCommentToPost: addCommentToPost,
    deleteCommentFromPost: deleteCommentFromPost,
    addOrRemoveLikeToPost: addOrRemoveLikeToPost
};