const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let followedSeriesSchema = new Schema({
        userId: String,
        seriesId: Number,
        following: Boolean,
        rating: {type: Number, max: 10, default: 0}
    }, {versionKey: false}
);

module.exports = mongoose.model('followedSeries', followedSeriesSchema);