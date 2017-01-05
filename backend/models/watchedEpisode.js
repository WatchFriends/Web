const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let watchedEpisodeSchema = new Schema(
    {
        userId: String,
        seriesId: Number,
        seasonId: Number,
        episodeId: Number,
        watched: Boolean
    }, {versionKey: false}
);

module.exports = mongoose.model('watchedEpisodes', watchedEpisodeSchema);