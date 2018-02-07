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
  comments: [{ postId: mongoose.Schema.ObjectId, commentId: mongoose.Schema.ObjectId}] //postId and commentId
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
      user.save((err) => {
        if (err) return cb(err, null);
        cb(null, postId);
      });      
    } else { cb(err, null); }
  });
}

function deleteWegpiraatById(postId, user, cb) {
  getUserById(user._id, (err, user) => { 
    if (!err && user) {      
      user.posts.splice(user.posts.indexOf(postId), 1);
      user.save((err) => {
        if (err) cb(err, null);
        cb(null, "Wegpiraat " + postId + " deleted")
      });      
    } else { cb(err, null); }
  });
}

function addComment(postId, commentId, user, cb) {
  getUserById(user._id, (err, user) => {    
    if (!err && user) {
      user.comments.push({postId:postId, commentId:commentId});
      user.save((err) => {
        if (err) return cb(err, null);
        cb(null, "Commented on " + postId);
      });      
    } else { cb(err, null); }
  });
}

function deleteComment(postId, commentId, user, cb) {
    getUserById(user._id, (err, user) => { 
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

function addLike(postId, user, cb) {
    getUserById(user._id, (err, user) => {    
      if (!err && user) {
        user.likes.push(postId);
        user.save((err) => {
          if (err) return cb(err, null);
          cb(null, "Liked " + postId);
        });      
      } else { cb(err, null); }
    });
}

function deleteLike(postId, user, cb) {
  getUserById(user._id, (err, user) => { 
    if (!err && user) {
      var likes = user.likes;
      for (let i = 0; i < likes.length; ++i) 
        if (likes[i].toString() === postId)
          user.likes.splice(likes[i].toString().indexOf(), 1);   
      user.save((err) => {
        if (err) return cb(err, null);
        cb(null, "Unliked " + postId);
      });
    } else { cb(err, null); }
  });
}

module.exports = {
  validateAccount: validateAccount,
  getUserByEmail: getUserByEmail,
  getUserById: getUserById,
  createUser: createUser,
  addWegpiraat: addWegpiraat,
  deleteWegpiraatById: deleteWegpiraatById,
  addComment: addComment,
  deleteComment: deleteComment,
  addLike: addLike,
  deleteLike: deleteLike
};