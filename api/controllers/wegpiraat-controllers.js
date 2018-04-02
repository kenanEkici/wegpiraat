'use strict';

var business = require('../business/business');
var wpRepo = require('../models/wegpiraat');
var authRepository = require('../models/user');

//Check if API is up
function checkStatus(req,res) {
    res.json({status : "up" });
}

//Get all posts (TODO: with filter/sort and/or pagination)
function getAllWegpiraten(req,res) {
    wpRepo.getAllWegpiraten((err,data) => {
        if (err) res.status(400).send(err);
        else res.send(data);
    });
}

//Get all posts by a given array of Post ID's
function getWegpiratenByIdArray(req,res) {
    wpRepo.getWegpiratenByIdArray(req.body.idArr, (err, data) => {
        if (err) res.status(400).send(err);
        else res.send(data);
    });
}

//Get a post by a given id ==> TODO if wegpiraat not found, delete from own list of reference 
function getWegpiraatById(req,res) {    
    wpRepo.getWegpiraatById(req.params.postId, (err, data) => {
        if (err) res.status(400).send(err);
        else res.send(data);      
    });
}

//Add a post => if success => add reference to user
function addWegpiraat(req,res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => { 
        if (err) res.status(400).send(err); 
        else {
            wpRepo.createWegpiraat(req.body, user, (err, post) => { //add post
                if (err) res.status(400).send(err); 
                else { 
                    authRepository.addWegpiraat(post._id, user, (err, user) => { //adds reference
                        if (err) res.status(400).send(err);
                        else res.send(post); //returns the post
                    });
                }
            });
        }
    });    
}

//Delete a post by a given id and correct auth => if success => delete from the user
function deleteWegpiraatById(req,res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => { 
        if (err) res.status(400).send(err);
        else if (!business.postBelongsToUser(req.params.postId, user)) res.sendStatus(403); //unauthorized 
        else {  //authorized
            wpRepo.deleteWegpiraatById(req.params.postId, (err, postId) => { //delete post
                if (err) res.status(400).send(err);
                else {
                    authRepository.deleteWegpiraatById(postId, user, (err, confirmation) => { //delete reference
                        if (err) res.status(400).send(err);
                        else res.send(confirmation); //returns the confirmation
                    });
                }
            });
        }        
    });    
}

//Update a post by a given id if authorized to
function updateWegpiraatById(req,res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => { 
        if (err) res.status(400).send(err);
        if (!business.postBelongsToUser(req.params.postId, user)) res.sendStatus(403); //unauthorized 
        else {  //authorized
            wpRepo.updateWegpiraatById(req.params.postId, req.body, (err, post) => { //updated post
                if (err) res.status(400).send(err);
                else res.send(post); //return updated post
            });
        }        
    }); 
}

//Add a comment to a post => if success => add a reference to the user
function addCommentToPost(req,res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => {
        if (err) res.status(400).send(err);
        else {
            wpRepo.addCommentToPost(req.params.postId, req.body, user, (err, comment) => { //add comment
                if (err) res.status(400).send(err);
                else { 
                    authRepository.addComment(req.params.postId, comment._id, user, (err, user) => { //add reference
                        if (err) res.status(400).send(err);
                        else res.send(comment); //return added comment
                    });
                }
            });
        }   
    });
}

//Delete a comment from a post if authorized => if success => remove a reference to the user
function deleteCommentFromPost(req,res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => {
        if (err) res.status(400).send(err); 
        else if (!business.commentBelongsToUser(req.params.commentId, user)) res.sendStatus(403); //unauthorized
        else { //authorized
            wpRepo.deleteCommentFromPost(req.params.postId, req.params.commentId, (err, commentId) => { //returns the commentId
                if (err) res.status(400).send(err);
                else {
                    authRepository.deleteComment(req.params.postId, commentId, user, (err, confirmation) => { //removes the returned commentId 
                        if (err) res.status(400).send(err);
                        else res.send(confirmation); //returns the confirmation
                    });
                }
            });
        }       
    });
}

//Add a like to a post or remove if already liked => if success => add/delete reference to user 
function likeOrUnlikePost(req, res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => {
        if (err) res.status(400).send(err);
        wpRepo.getWegpiraatById(req.params.postId, (err, post) => {
            if (business.isPostLiked(user, post)) {
                //post is already liked
                wpRepo.deleteLikeFromPost(req.params.postId, user, (err, postId) => {
                    if (err) res.status(400).send(err);
                    else {
                        authRepository.deleteLike(postId, user, (err, confirmed) => {
                            if (err) res.status(400).send(err);
                            else res.send(confirmed); //return confirmation
                        });
                    }
                });
            } else {
                //post is not liked yet
                wpRepo.addLikeToPost(req.params.postId, user, (err, postId) => {
                    if (err) res.status(400).send(err);
                    else {
                        authRepository.addLike(postId, user, (err, confirmed) => {
                            if (err) res.status(400).send(err);
                            else res.send(confirmed); //return confirmation
                        });
                    }
                });
            }
        });        
    });
}

module.exports = {
    checkStatus: checkStatus,
    addWegpiraat: addWegpiraat,
    getAllWegpiraten: getAllWegpiraten,
    getWegpiraatById: getWegpiraatById,
    getWegpiratenByIdArray: getWegpiratenByIdArray,
    updateWegpiraatById: updateWegpiraatById,
    deleteWegpiraatById: deleteWegpiraatById,
    addCommentToPost: addCommentToPost,
    deleteCommentFromPost: deleteCommentFromPost,
    likeOrUnlikePost: likeOrUnlikePost
};