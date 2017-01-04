var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var followedSeriesSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    seriesId: Number,
    following: Boolean,
    rating: { type: Number, max: 10, default: 0 }
}, { versionKey: false });

module.exports = mongoose.model('followedSeries', followedSeriesSchema);