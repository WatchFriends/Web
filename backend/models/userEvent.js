const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let eventsSchema = new Schema({
        userId: String,
        userName: String,
        params: [{
            follow: {type: Boolean, default: false},
            watch: {type: Boolean, default: false},
            friendId: {type: String, default: ''},
            seriesId: {type: Number, default: 0},
            seasonId: {type: Number, default: 0},
            episodeId: {type: Number, default: 0},
            rating: {type: Number, default: 0}
        }],
        time: {type: Date, default: Date.now}
    }, {versionKey: false}
);

module.exports = mongoose.model('userEvent', eventsSchema);

/*
 * Beginning of feed
 *   Historical + socket.io
 *
 *   examples:
 *       Michiel now follows Michiel Zyde
 *       Michiel gave The Walking Dead a rating of 5 stars
 *       Michiel watched The Walking Dead Season 1 Episode 1 - blablabla
 *       Michiel no longer follows The Walking Dead
 *       Michiel completed Season 4 of The Walking Dead
 *       Michiel unlocked the Achievement: bingewatcher
 * */