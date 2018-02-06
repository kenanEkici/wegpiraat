'use strict'

var mongoose = require('mongoose');
var business = require('../business/business');

var commentSchema = mongoose.Schema(
    {
        commentData: { type:String, minlength:1, maxlength:250 },
        postedBy: { type: String }, //username
        postedAt: { type: Date }
    }
);

var likeSchema = mongoose.Schema(
    {    
        likedBy: { type: String } //username
    }
);

var wegpiraatSchema = mongoose.Schema(
    {
        title : String,
        description : String,
        picture : String,
        createdAt : Date,

        owner: { type : String }, //username
        likes : [{ type : likeSchema }], 
        comments: [{ type: commentSchema }]
    }
);

var Wegpiraat = mongoose.model('Wegpiraten', wegpiraatSchema);

function getAllWegpiraten(cb) {
    Wegpiraat.find({}, (err, data) => {
        if (err) return cb(err, null);      
        cb(null, data);
    });
}

function getWegpiraatById(id, cb) {
    if (business.checkObjectId(id)) {
        Wegpiraat.findOne({_id:mongoose.mongo.ObjectId(id)}, (err, data) => {
            if (err) return cb(err, null);      
            cb(null, data);
        });
    } else {
        cb("Wegpiraat {{id}} not found", null);
    }    
}

function createWegpiraat(body, user, cb) {
    
    var newWegpiraat = new Wegpiraat({
        title: body.title,
        description: body.description,
        picture: body.picture,
        createdAt: body.createdAt,
        owner: user.username
    });

    newWegpiraat.save((err,data) => {
        if (err) return cb(err, null);
        cb(null, data);
    });
}

function deleteWegpiraatById(id, cb) {
    Wegpiraat.remove({_id:mongoose.mongo.ObjectId(id)}, (err) => {
        if (err) return cb(err, null);
        cb(null, id);
    });
}

function updateWegpiraat(id, body, cb) {  
    getWegpiraatById(id, todo => {
        if (todo != []) {
            
            todo = todo[0];

            todo.title = body.title;
            todo.description = body.description;
            todo.picture = body.picture;

            todo.save((err,data) => {
                if (err) return cb(err);
                cb(data);
            });
        } else {
            cb("Wegpiraat {id} not found");
        }
    });
}

function addCommentToPost(postId, body, user, cb) {
    getWegpiraatById(postId, (err, post) => {
        if (err) return cb(err, null);
        var comment = {
            postedBy: user.username,
            postedAt: body.date,
            commentData: body.commentData
        };

        if (!err && post) {
            post.comments.push(comment);
            var pushedComment = post.comments[post.comments.length-1];
            post.save((err) => {
                if (err) return cb(err, null);
                cb(null, pushedComment);
            });
        } else {
            cb("Post " + postId + " not found", null);
        }
    });         
}

function deleteCommentFromPost(postId, commentId, cb) {
    getWegpiraatById(postId, (err, post) => {
        if (err) return cb(err, null);
        if (!err && post) {
            post.comments.id(commentId).remove();
            post.save();
            cb(null, commentId);
        } else {
            cb("Post " + postId + " not found", null);
        }
    });
}

module.exports = {
    getAllWegpiraten: getAllWegpiraten,
    getWegpiraatById: getWegpiraatById,
    createWegpiraat: createWegpiraat,
    updateWegpiraat: updateWegpiraat,
    deleteWegpiraatById: deleteWegpiraatById,
    addCommentToPost: addCommentToPost,
    deleteCommentFromPost: deleteCommentFromPost
};