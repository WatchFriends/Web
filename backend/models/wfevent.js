const mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

let eventsSchema = new Schema({
        userId: String,
        userName: String,
        message: String,
        url: String,
        time: {type: Date, default: Date.now}
    }, {versionKey: false}
);

eventsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('wfevent', eventsSchema);

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