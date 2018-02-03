var mongoose = require('mongoose');

var wegpiraatSchema = mongoose.Schema({
    title : String,
    description : String,
    picture : String,
    createdAt : Date,

    owner:  { type : mongoose.Schema.ObjectId },
    likedBy :  [{ type : mongoose.Schema.ObjectId }],
    comments:  [{ type : mongoose.Schema.ObjectId }]
});

var Wegpiraat = mongoose.model('Wegpiraten', wegpiraatSchema);

function getAllWegpiraten(callback) {
    Wegpiraat.find({}, (err, data) => {
        if (err) return callback(err, null);      
        callback(null, data);
    });
}

function getWegpiraatById(id, callback) {
    Wegpiraat.find({_id:mongoose.mongo.ObjectId(id)}, (err, data) => {
        if (err) return callback(err, null);      
        callback(null, data);
    });
}

function createWegpiraat(body, userId, callback) {
    var newWegpiraat = new Wegpiraat({
        title: body.title,
        description: body.description,
        picture: body.picture,
        createdAt: body.createdAt,
        owner: userId
    });

    newWegpiraat.save((err,data) =>{
        if (err) return callback(err, null);
        callback(null, data);
    });
}

function deleteWegpiraatById(id, callback) {
    Wegpiraat.remove({_id:mongoose.mongo.ObjectId(id)}, err => {
        if (err) return callback(err);
        callback("Wegpiraat {id} deleted");
    });
}

function updateWegpiraat(id, body, callback) {  
    getWegpiraatById(id, todo => {
        if (todo != []) {
            
            todo = todo[0];

            todo.title = body.title;
            todo.description = body.description;
            todo.picture = body.picture;

            todo.save((err,data) => {
                if (err) return callback(err);
                callback(data);
            });
        } else {
            callback("Wegpiraat {id} not found");
        }
    });
}

module.exports = {
    getAllWegpiraten: getAllWegpiraten,
    getWegpiraatById: getWegpiraatById,
    createWegpiraat: createWegpiraat,
    updateWegpiraat: updateWegpiraat,
    deleteWegpiraatById: deleteWegpiraatById
};

