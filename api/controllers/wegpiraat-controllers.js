'use strict';

var business = require('../business/business');
var wpRepo = require('../models/wegpiraat');
var authRepository = require('../models/user');

function checkStatus(req,res) {
    res.json({status : "up" });
}

function getAllWegpiraten(req,res) {
    wpRepo.getAllWegpiraten(data => res.send(data));
}

function getWegpiraatById(req,res) {    
    wpRepo.getWegpiraatById(req.params.id, (err, data) => {
        if (err) res.status(400).send(err);
        res.send(data);      
    });
}

function addWegpiraat(req,res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => { 
        wpRepo.createWegpiraat(req.body, user, (err, data) => { //returns the piraat obj
            if (err) { res.status(400).send(err); }
            else { 
                authRepository.addWegpiraat(data._id, user, (err, data) => { //adds the piraatId
                    if (err) { res.status(400).send(err); }
                    else res.send(data); //returns the piraatId
                });
            }
        });
    });    
}

function deleteWegpiraatById(req,res) {
    wpRepo.deleteWegpiraatById(req.params.id, data => {
        if (err) res.status(400).send(err);
        else res.send(data);
    });
}

function updateWegpiraatById(req,res) {
    wpRepo.updateWegpiraat(req.params.id, req.body, data => {
        if (err) res.status(400).send(err);
        else res.send(data);
    });
}

function addCommentToPost(req,res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => {
        wpRepo.addComment(req.params.id, req.body, user, (err,data)=>{ //returns the postId
            if (err) { res.status(400).send(err); }
            else { 
                authRepository.addComment(data, user, (err,data)=>{ //adds the returned postId 
                    if (err) res.status(400).send(err);
                    else res.send(data);
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
    updateWegpiraatById: updateWegpiraatById,
    deleteWegpiraatById: deleteWegpiraatById,
    addCommentToPost: addCommentToPost
};