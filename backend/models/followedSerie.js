/**
 * Created by mickv on 2/01/2017.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var followedSeriesSchema = new Schema({
        userId: String,
        seriesId: Number,
        following: Boolean
    }, {versionKey: false}
);

module.exports = mongoose.model('followedSeries', followedSeriesSchema);