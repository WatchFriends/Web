const config = require("./config.json"),
    mongoose = require('mongoose'),
    achievement = require("./../models/achievement"),
    users = require("./../models/user"),
    followedSerie = require('./../models/followedSerie'),
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
    existsFollowedSerie = (body, cb) => {
        followedSerie
            .count({
                userId: body.userId,
                seriesId: body.seriesId
            })
            .exec(cb);
    },
    updateFollowedSerie = (body, cb) => {
        existsFollowedSerie(body, (err, count) => {
            if (count > 0) {
                followedSerie.update({
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
                new followedSerie({
                    userId: body.userId,
                    seriesId: body.seriesId,
                    following: body.following
                }).save(cb);
            }
        });
    },
    getAllFollowedSeriesByUserId = (user, cb) => {
            followedSerie.find({
                userId: user._id,
                following: true
            }, {
                userId: 0,
                following: 0,
                __v: 0,
            }).exec(cb);
    },
    getWatchedEpisodesBySeriesSeasonId = (params, user, cb) => {
        watchedEpisode.find({
            userId: user._id,
            seriesId: params.series,
            seasonId: params.season
        }, {
            userId: 0,
            watched: 0,
            __v: 0,
        }).exec(cb);
    };

module.exports = {
    /* ACHIEVEMENTS */
    getAchievements: (cb) => achievement.find({}).exec(cb),

    /* FOLLOWEDSERIE */
    existsFollowedSerie: existsFollowedSerie,
    updateFollowedSerie: updateFollowedSerie,
    getAllFollowedSeriesByUserId: getAllFollowedSeriesByUserId,

    /* WATCHEDEPISODE */
    findWatchedEpisode: existsWatchedEpisode,
    updateWatchedEpisode: updateWatchedEpisode,
    getWatchedEpisodesBySeriesSeasonId: getWatchedEpisodesBySeriesSeasonId
};