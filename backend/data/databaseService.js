const config = require('./config.json'),
    mongoose = require('mongoose'),
    async = require('async'),
    achievement = require('../models/achievement'),
    user = require('../models/user'),
    follower = require('../models/follower'),
    followedSeries = require('../models/followedSeries'),
    watchedEpisode = require('../models/watchedEpisode');
    userEvent = require('../models/userEvent');

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
    existsFollowedSeries = (userId, seriesId, cb) => {
        followedSeries
            .count({
                user: userId,
                seriesId
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
    },
    getAllFollowedSeriesByUserId = (userId, cb) => {
        followedSeries.find({
            user: userId,
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

function addFollowedSeries(user, series, cb) {
    followedSeries.findOne({user, seriesId: series.id}, {following: 1, rating: 1})
        .exec((err, followed) => {
            if (err) return cb(err);
            cb(null, {
                series,
                following: followed ? followed.following : false,
                rating: followed ? followed.rating : -1
            });
        });
}

function addEvent(data, user, cb) {
    let newEvent = new userEvent({
        userId: user._id,
        userName: user.name,
        params: [{}]
    });

    if (data.follow !== undefined) newEvent.params[0].follow = data.follow;
    if (data.watch !== undefined) newEvent.params[0].watch = data.watch;
    if (data.friendId !== undefined) newEvent.params[0].friendId = data.friendId;
    if (data.seriesId !== undefined) newEvent.params[0].seriesId = data.seriesId;
    if (data.seasonId !== undefined) newEvent.params[0].seasonId = data.seasonId;
    if (data.episodeId !== undefined) newEvent.params[0].episodeId = data.episodeId;
    if (data.rating !== undefined) newEvent.params[0].rating = data.rating;

    newEvent.save(cb);
}

module.exports = {
    /* ACHIEVEMENTS */
    getAchievements: (cb) => achievement.find({}).exec(cb),

    /* FOLLOWEDSERIES */
    getFollowedSeries: (user, cb) =>
        followedSeries.find({user}, {_id: 0, user: 0}).exec(cb),

    updateFollowedSeries: (user, seriesId, data, cb) =>
        followedSeries.update({user, seriesId}, data, {upsert: true, setDefaultsOnInsert: true}).exec(cb),

    findFollowedSeries: (user, seriesId, cb) =>
        followedSeries.findOne({user, seriesId}, {_id: 0, user: 0, seriesId: 0}).exec(cb),

    addFollowedSeries,

    addFollowedSeriesList: (user, seriesList, cb) => {
        let results = [];
        async.each(seriesList, (item, cb) =>
            addFollowedSeries(user, item, (err, series) => {
                if (err) return cb(err);
                results.push(series);
                cb();
            }), err => {
            if (err) return cb(err);
            cb(null, results);
        });
    },
    /* USER */
    getUser: (id, cb) => 
        user.findById(id, {name: 1, email:1, _id:1}).exec(cb),

    searchUsers: (query, cb) => 
        user.find({$text: {$search: query}}).exec(cb),

    /* FOLLOWER */

    getFollowers: (userId, cb) => 
        follower.find({userId}).exec(cb),

    getFollows: (userId, cb) => 
        follower.find({ followerId: userId}).exec(cb),

    getFollower: (userId, followerId, cb) => 
        follower.findOne({ userId, followerId}, {since}).exec((err, data) =>{
            if(err) return cb(err);
            cb(null, data ? data.since : null);
        }),

    updateFollower: (userId, followerId, since, cb) => {
        if(since) {
            // update or create
            return follower.update({userId, followerId}, {since}, { upsert: true, setDefaultsOnInsert: true }).exec(cb);
        }
        // remove
        follower.find({userId: followsId, followedId: userId}).remove().exec(cb);
    },

    /* WATCHEDEPISODE */
    findWatchedEpisode: existsWatchedEpisode,
    updateWatchedEpisode,
    getWatchedEpisodesBySeriesSeasonId,
    addEvent
};