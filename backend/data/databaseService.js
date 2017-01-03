const config = require("./config.json"),
    mongoose = require('mongoose'),
    achievement = require("./../models/achievement"),
    users = require("./../models/user"),
    followedSeries = require('./../models/followedSeries'),
    watchedEpisode = require('./../models/watchedEpisode');

let existsWatchedEpisode = (body, cb) => {
    watchedEpisode
        .count({
            userId: body.userId,
            seriesId: body.seriesId,
            seasonId: body.seasonId,
            episodeId: body.episodeId
        })
        .exec(cb);
    },
    updateWatchedEpisode = (body, cb) => {
        existsWatchedEpisode(body, (err, count) => {
            if (count > 0) {
                watchedEpisode.update({
                        userId: body.userId,
                        seriesId: body.seriesId,
                        seasonId: body.seasonId,
                        episodeId: body.episodeId

                    }, {
                        "$set": {
                            watched: body.watched
                        }
                    }
                )
                    .exec(cb);
            } else {
                new watchedEpisode({
                    userId: body.userId,
                    seriesId: body.seriesId,
                    seasonId: body.seasonId,
                    episodeId: body.episodeId,
                    watched: body.watched
                }).save(cb);
            }
        });
    },
    existsFollowedSeries = (body, cb) => {
        followedSeries
            .count({
                userId: body.userId,
                seriesId: body.seriesId
            })
            .exec(cb);
    },
    updateFollowedSeries = (body, cb) => {
        existsFollowedSeries(body, (err, count) => {
            if (count > 0) {
                followedSeries.update({
                        userId: body.userId,
                        seriesId: body.seriesId

                    }, {
                        "$set": {
                            following: body.following
                        }
                    }
                )
                    .exec(cb);
            } else {
                new followedSeries({
                    userId: body.userId,
                    seriesId: body.seriesId,
                    following: body.following
                }).save(cb);
            }
        });
    };

module.exports = {
    /* ACHIEVEMENTS */
    getAchievements: (cb) => achievement.find({}).exec(cb),

    /* FOLLOWEDSERIES */
    existsFollowedSeries: existsFollowedSeries,
    updateFollowedSeries: updateFollowedSeries,

    /* WATCHEDEPISODE */
    findWatchedEpisode: existsWatchedEpisode,
    updateWatchedEpisode: updateWatchedEpisode,

    /* USERS */
    getUser: (cb) => User.find({}, cb)
};