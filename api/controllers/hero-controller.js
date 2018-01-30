'use strict';

var business = require('../business/business');
var hrep = require('../repos/hero-repo');

exports.checkStatus = function(req,res) {
    res.json({status : "up" });
}

exports.getAllHeroes = function(req,res) {
    hrep.getAllHeroes(function(data) {
        res.send(data);
    });
}

exports.getHeroByName = function(req,res) {
    hrep.getHeroById(req.params.id, function(data) {
        res.send(data);
    })
}

exports.createHero = function(req,res) {
    hrep.createHero(req.body, function(data) {
        res.send(data);
    });
}

exports.deleteHeroByName = function(req,res) {
    hrep.deleteHeroById(req.params.id,function(data) {
        res.send(data)
    })
}

exports.updateHeroByName = function(req,res) {
    hrep.updateHero(req.params.id, req.body, function(data) {
        res.send(data);
    })
}