'use strict'

module.exports = {
};

var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    commentData: { type:String, minlength:1, maxlength:250 },
    postedBy: { type: String } //userId
});

var Comment = mongoose.model('Comments', commentSchema );