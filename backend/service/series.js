const apiService = require('../data/apiService'),
    dbService = require('../data/databaseService'),
    request = require('request'),
    each = require('async').each,
    followedSeries = require('../models/followedSeries');

module.exports = (function () {

    let watchlist = (id, cb) => {
        dbService.getFollowedSeries(id, (err, data) => {
            if (err) return cb(err);
            let results = [];
            // voor ieder followed object een series opvragen
            each(data, (item, cb) => {

                apiService.request(`tv/${item.seriesId}?append_to_response=images,similar`, (err, series) => {
                    if (err) return cb(err);

                    series["following"] = item.following;
                    series["rating"] = item.rating;

                    results.push(series);
                    cb();
                });
            }, err => {
                if (err) return cb(err);
                cb(null, results);
            });
        });
    };

    return {
        watchlist
    }

})();
