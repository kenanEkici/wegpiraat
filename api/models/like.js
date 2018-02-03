'use strict'

module.exports = {
};

var mongoose = require('mongoose');

var likeSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },    
    likedBy: { type: String } //email
});

var Like = mongoose.model('Likes', likeSchema );