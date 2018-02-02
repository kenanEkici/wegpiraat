var mongoose = require('mongoose');

var wegpiraatSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    title : String,
    description : String,
    picture : String,
    createdAt : Date,
    likes : Number,
    comments : Array[]
  });

module.exports = mongoose.model('Wegpiraat', wegpiraatSchema );
