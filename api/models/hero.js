var mongoose = require('mongoose');

var heroSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    name: { type : String , unique : true, required : true },
    difficulty: Number,
    dps:Number,
    avatar: String
  });

module.exports = mongoose.model('Hero', heroSchema );
