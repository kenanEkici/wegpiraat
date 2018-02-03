'use strict'

module.exports = {
  validateAccount: validateAccount,
  getUserByEmail: getUserByEmail,
  getUserById: getUserById,
  createUser: createUser
};

var mongoose = require('mongoose');
var business = require('../business/business');

var userSchema = mongoose.Schema({
  email: { type: String, required: true, index: { unique: true } },
  firstname: String,
  lastname: String,

  hashed_password: { type: String, required: true },
  password_reset_token: { type: String, unique: true, sparse: true },
  reset_token_expires: Date,  

  posts:  [{ type : mongoose.Schema.ObjectId }], //postId
  likes:  [{ type : mongoose.Schema.ObjectId }], //likeId
  comments: [{ type : mongoose.Schema.ObjectId }] //commentId
});

var User = mongoose.model('Users', userSchema);

function createUser(body, cb) {
  new User(body).save(cb);
}

function getUserByEmail(email, cb) {
  User.findOne({ email: email }, (err, user) => {
      if (err || !user) return cb(err);
      cb(null, user);
  });
}

function getUserById(id, cb) {
  User.findOne({_id:mongoose.mongo.ObjectId(id)}, (err, user) => {
    if (err || !user) return cb(err);
    cb(null, user);
  });
}

function validateAccount(email, password, cb) {
  getUserByEmail(email, function(err, user ){
    if (err || !user) return cb(err);  
      cb(null, business.validatePassword(password, user.hashed_password) ? user._id : null);
  });
}