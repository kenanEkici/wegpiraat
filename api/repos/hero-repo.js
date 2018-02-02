var hero = require('../models/hero');
var mongoose = require('mongoose');

//start mongoose database
mongoose.connect('mongodb://localhost/heroes', { useMongoClient: true });
console.log("connected with heroes database");

exports.getAllHeroes = function(callback) {
    hero.find({}, function(err, data) {
        callback(data)
    });
}

exports.getHeroById = function(id, callback) {
    hero.find({_id:mongoose.mongo.ObjectId(id)},function(err, data) {
        if (err) {
            callback(err, ""); return;
        }
        callback("", data);
    });    
}

exports.createHero = function(body, callback) {
    var newHero = new hero({
        avatar:body.avatar,
        difficulty:body.difficulty,
        dps:body.dps,
        name:body.name
    });

    newHero.save(function(err,data) {
        if (err) {
            callback(err, ""); return;
        }
        callback("", "hero created");
    });
}

exports.deleteHeroById = function(id, callback) {
    hero.remove({_id:mongoose.mongo.ObjectId(id)}, function(err) {
        if (err) callback(err);
        callback("hero deleted");
    });
}

exports.updateHero = function(id, body, callback) {
    
    this.getHeroById(id, function(todo) {
        if (todo != []) {
            
            todo = todo[0];

            todo.name = body.name;
            todo.avatar = body.avatar;
            todo.dps = body.dps;
            todo.difficulty = body.difficulty;

            todo.save((err,data) => {
                if (err) callback(err);
                callback(data);
            });
        } else {
            callback("hero not found");
        }
    })
}