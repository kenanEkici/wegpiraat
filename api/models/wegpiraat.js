'use strict'

var mongoose = require('mongoose');
var business = require('../business/business');
var mp = require('mongoose-paginate');

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
        plate : String,
        picture : String,
        createdAt : Date,

        owner: { type : String }, //username
        likes : [{ type : likeSchema }], 
        comments: [{ type: commentSchema }]
    }
);
wegpiraatSchema.plugin(mp);

var Wegpiraat = mongoose.model('Wegpiraten', wegpiraatSchema);

function getAllWegpiraten(page, cb) {
    Wegpiraat.paginate({}, { page: page, limit: 10, sort: {createdAt:-1} }, function(err, data) {
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

function getWegpiraatByPlate(page, plate, cb) {
    Wegpiraat.paginate({plate:plate}, { page: page, limit: 10, sort: {createdAt:-1} }, cb);
}

function getWegpiratenByIdArray(page, arr, cb) {
    Wegpiraat.paginate({'_id': { $in: arr}}, { page: page, limit: 10, sort: {createdAt:-1} }, function(err, data) {
        if (err) return cb(err, null);
        cb(null, data);
    });
}

function createWegpiraat(body, user, cb) {
    
    var newWegpiraat = new Wegpiraat({
        title: body.title,
        plate: body.plate,
        picture: body.uri,
        createdAt: body.created,
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

function updateWegpiraatById(id, body, cb) {
    getWegpiraatById(id, (err, todo) => {
        if (todo) {
            todo.title = body.title;
            todo.plate = body.plate;
            todo.picture = body.picture;

            todo.save((err,data) => {
                if (err) return cb(err, null);
                cb(null, data);
            });
        } else {
            cb(err, null);
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

        if (post) {
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
        if (post) {
            post.comments.id(commentId).remove();
            post.save((err) => {
                if (err) return cb(err, null);
                cb(null, commentId);
            });
            
        } else {
            cb("Post " + postId + " not found", null);
        }
    });
}

function addLikeToPost(postId, user, cb) {
    getWegpiraatById(postId, (err, post) => {
        if (err) return cb(err, null);
        var like = { likedBy: user.username };
        if (post) {
            post.likes.push(like);
            var like = post.likes[post.likes.length-1];
            post.save((err) => {
                if (err) return cb(err, null);
                cb(null, post._id);
            });
        } else {
            cb("Post " + postId + " not found", null);
        }
    });        
}

function deleteLikeFromPost(postId, user, cb) {
    getWegpiraatById(postId, (err, post) => {
        if (err) return cb(err, null);
        if (post) {
            var likes = post.likes;
            for (let i = 0; i < likes.length; ++i) 
                if (likes[i].likedBy.toString() === user.username)
                    post.likes.splice(likes[i].toString().indexOf(), 1);             
            post.save((err) => {
                if (err) return cb(err, null);
                cb(null, postId);
            });
        } else {
            cb("Post " + postId + " not found", null);
        }
    });
}

function getLikedWegpiraten(username, cb) {
    Wegpiraat.find({ 'likes.likedBy': username }, (err, data) => {
        if (err) return cb(err, null);    
        cb(null, data);
    });
}

module.exports = {
    getAllWegpiraten: getAllWegpiraten,
    getWegpiraatById: getWegpiraatById,
    getWegpiratenByIdArray: getWegpiratenByIdArray,
    createWegpiraat: createWegpiraat,
    updateWegpiraatById: updateWegpiraatById,
    deleteWegpiraatById: deleteWegpiraatById,
    addCommentToPost: addCommentToPost,
    deleteCommentFromPost: deleteCommentFromPost, 
    addLikeToPost: addLikeToPost,
    deleteLikeFromPost: deleteLikeFromPost,
    getLikedWegpiraten: getLikedWegpiraten,
    getWegpiraatByPlate: getWegpiraatByPlate
};