var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var followerSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: "User"
    },
    followerId: {
        type: Schema.ObjectId,
        ref: "User"
    },
    since: {
        type: Date,
        default: Date.now
    }
}, { autoIndex:false });

module.exports = mongoose.model('follower', followerSchema);