'use strict';

module.exports = {
    checkStatus: checkStatus,
    createWegpiraat: createWegpiraat,
    getAllWegpiraten: getAllWegpiraten,
    getWegpiraatById: getWegpiraatById,
    updateWegpiraatById: updateWegpiraatById,
    deleteWegpiraatById: deleteWegpiraatById
};

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

function createWegpiraat(req,res) {
    authRepository.getUserById(req.oauth.bearerToken.userId, (err, user) => {
        wpRepo.createWegpiraat(req.body, user, (err, data) => {
            if (err) res.status(400).send(err);
            else res.send(data);
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