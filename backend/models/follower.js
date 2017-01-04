var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var followerSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    followed: {
        type: Schema.ObjectId,
        ref: "User"
    },
    since: {
        type: Date,
        default: Date.now
    }
}, { autoIndex=false });

module.exports = mongoose.model('followers', followerSchema);