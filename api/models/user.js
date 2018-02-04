'use strict'

var mongoose = require('mongoose');
var business = require('../business/business');

var userSchema = mongoose.Schema({
  validatedEmail: { type: String, required: true, unique: true },
  email: String,
  username: {type: String, index: { unique: true } },
  firstname: String,
  lastname: String,

  hashed_password: { type: String, required: true },
  password_reset_token: { type: String, unique: true, sparse: true },
  reset_token_expires: Date,  

  posts:  [{ type : mongoose.Schema.ObjectId }], //postId
  likes:  [{ type : mongoose.Schema.ObjectId }], //postId
  comments: [{ type : mongoose.Schema.ObjectId }] //postId
});

var User = mongoose.model('Users', userSchema);
module.exports = User;

function createUser(body, cb) {
  new User(body).save(cb);
}

function getUserByEmail(email, cb) {
  User.findOne({ validatedEmail: email }, (err, user) => {
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

function addWegpiraat(postId, user, cb) {
  getUserById(user._id, (err, user) => { 
    if (!err && user) {
      user.posts.push(postId);
      user.save(cb);      
    } else { cb(err, null); }
  });
}

function addComment(postId, user, cb) {
  getUserById(user._id, (err, user) => {    
    if (!err && user) {
      user.comments.push(postId);
      user.save(cb);      
    } else { cb(err, null); }
  });
}

module.exports = {
  validateAccount: validateAccount,
  getUserByEmail: getUserByEmail,
  getUserById: getUserById,
  createUser: createUser,
  addWegpiraat, addWegpiraat,
  addComment: addComment
};