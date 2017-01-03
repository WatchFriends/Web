var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventsFeedSchema = new Schema({
        userId: String,
        userName: String,
        //follow, unfollow, watch
        event: String,
        params: [{
            friendId: String,
            seriesId: Number,
            seasonId: Number,
            episodeId: Number,
            //10 = 5 stars, 9 = 4.5 stars
            rating: {type: Number, max: 10, default: 0}
        }],
        time: {type: Date, default: Date.now}
    }, {versionKey: false}
);

module.exports = mongoose.model('events', eventsFeedSchema);

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