'use strict';

var business = require('../business/business');
var wpRepo = require('../models/wegpiraat');

function checkStatus(req,res) {
    res.json({status : "up" });
}

function getAllWegpiraten(req,res) {
    wpRepo.getAllWegpiraten(data => {
        res.send(data);
    });
}

function getWegpiraatById(req,res) {
    wpRepo.getWegpiraatById(req.params.id, (err, data) => {
        if (err)
            res.status(400).send(err);
        else 
            res.send(data);        
    });
}

function createWegpiraat(req,res) {
    wpRepo.createWegpiraat(req.body, (err, data) => {
        if (err)
            res.status(400).send(err);
        else 
            res.send(data);        
    });
}

function deleteWegpiraatById(req,res) {
    wpRepo.deleteWegpiraatById(req.params.id, data => {
        res.send(data)
    });
}

function updateWegpiraatById(req,res) {
    wpRepo.updateWegpiraat(req.params.id, req.body, data => {
        res.send(data);
    });
}

module.exports = {
    checkStatus: checkStatus,
    createWegpiraat: createWegpiraat,
    getAllWegpiraten: getAllWegpiraten,
    getWegpiraatById: getWegpiraatById,
    updateWegpiraatById: updateWegpiraatById,
    deleteWegpiraatById: deleteWegpiraatById
};