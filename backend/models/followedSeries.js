/**
 * Created by mickv on 2/01/2017.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var followedSeriesSchema = new Schema({
        userId: String,
        seriesId: Number,
        following: Boolean,
        rating: {type: Number, max: 10, default: 0}
    }, {versionKey: false}
);

module.exports = mongoose.model('followedSeries', followedSeriesSchema);