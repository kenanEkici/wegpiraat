'use strict'

var mongoose = require('mongoose');
var business = require('../business/business');

var userSchema = mongoose.Schema({
  _id: {type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: {type: String, required: true, index: { unique: true } },
  firstname: String,
  lastname: String,

  hashed_password: { type: String, required: true },
  password_reset_token: { type: String, unique: true, sparse: true },
  reset_token_expires: { type: Date },  

  posts:  [{ type : mongoose.Schema.ObjectId }], //postId
  likes:  [{ type : mongoose.Schema.ObjectId }], //postId
  comments: [{ postId: mongoose.Schema.ObjectId, commentId: mongoose.Schema.ObjectId}] //postId and commentId
});

userSchema.statics.createUser = function(body) {
  body._id = business.hashEmail(body.email);
  return new User(body);
}

userSchema.statics.getUserByEmail = function(email, cb) {
  User.findOne({ email: email }, (err, user) => {
      if (err || !user) return cb(err, null);
      cb(null, user);
  });
}

userSchema.statics.getUserById = function(id, cb) {
  User.findOne({_id:mongoose.mongo.ObjectId(id)}, (err, user) => {
    if (err || !user) return cb(err, null);
    cb(null, user);
  });
}

userSchema.statics.validateAccount = function(email, password, cb) {
  User.getUserByEmail(email, (err, user ) => {
    if (err || !user) return cb(err, null);  
    cb(null, business.validatePassword(password, user.hashed_password) ? user._id : null);
  });
}

userSchema.statics.resetPassword = function(email, newPassword, cb) {
  User.getUserByEmail(email, (err, user) => {
    if (err || !user) return cb(err, null);
    user.password_reset_token = null;
    user.reset_token_expires = null;
    user.hashed_password = newPassword;
    user.save((err, data) => {
      if (err) return cb(err, null);
      cb(null, data);
    });
  });
}

userSchema.statics.forgotPassword = function(email, token, expires, cb) {
  User.getUserByEmail(email, (err, user) => {
    if (err || !user) return cb(err, null);  
    user.password_reset_token = token;
    user.reset_token_expires = expires;
    user.save((err, data) => {
      if (err) return cb(err, null);
      cb(null, data);
    });
  });
}

userSchema.statics.addWegpiraat = function(postId, user, cb) {
  User.getUserById(user._id, (err, user) => { 
    if (!err && user) {
      user.posts.push(postId);
      user.save((err) => {
        if (err) return cb(err, null);
        cb(null, postId);
      });      
    } else { cb(err, null); }
  });
}

userSchema.statics.deleteWegpiraatById = function(postId, user, cb) {
  User.getUserById(user._id, (err, user) => { 
    if (!err && user) {      
      user.posts.splice(user.posts.indexOf(postId), 1);
      user.save((err) => {
        if (err) cb(err, null);
        cb(null, "Wegpiraat " + postId + " deleted")
      });      
    } else { cb(err, null); }
  });
}

userSchema.statics.addComment = function(postId, commentId, user, cb) {
  User.getUserById(user._id, (err, user) => {    
    if (!err && user) {
      user.comments.push({postId:postId, commentId:commentId});
      user.save((err) => {
        if (err) return cb(err, null);
        cb(null, "Commented on " + postId);
      });      
    } else { cb(err, null); }
  });
}

userSchema.statics.deleteComment = function(postId, commentId, user, cb) {
    User.getUserById(user._id, (err, user) => { 
      if (!err && user) {
        var comments = user.comments;
        for (let i = 0; i < comments.length; ++i) 
          if (comments[i].commentId.toString() === commentId)
            user.comments.splice(comments[i].commentId.toString().indexOf(), 1);          
        user.save((err) => {
          if (err) return cb(err, null);
          cb(null, "Comment " + commentId + " deleted")
        });      
      } else { cb(err, null); }
    });
}

userSchema.statics.addLike = function(postId, user, cb) {
    User.getUserById(user._id, (err, user) => {    
      if (!err && user) {
        user.likes.push(postId);
        user.save((err) => {
          if (err) return cb(err, null);
          cb(null, {liked:true});
        });      
      } else { cb(err, null); }
    });
}

userSchema.statics.deleteLike = function(postId, user, cb) {
  User.getUserById(user._id, (err, user) => { 
    if (!err && user) {
      var likes = user.likes;
      for (let i = 0; i < likes.length; ++i) 
        if (likes[i].toString() === postId)
          user.likes.splice(likes[i].toString().indexOf(), 1);   
      user.save((err) => {
        if (err) return cb(err, null);
        cb(null,  {liked:false});
      });
    } else { cb(err, null); }
  });
}

var User = mongoose.model('Users', userSchema);
module.exports = User;
