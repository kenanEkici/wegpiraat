var mongoose = require('mongoose');

var likeSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },    
    likedBy: { type: mongoose.Schema.ObjectId } //userId
});

var Like = mongoose.model('Likes', likeSchema );

module.exports = {
};