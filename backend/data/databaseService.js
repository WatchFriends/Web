const config = require('./config.json'),
    mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    async = require('async'),
    achievement = require('../models/achievement'),
    user = require('../models/user'),
    accessToken = require('../models/accessToken'),
    follower = require('../models/follower'),
    followedSeries = require('../models/followedSeries'),
    watchedEpisode = require('../models/watchedEpisode'),
    wfevent = require('../models/wfevent');

module.exports = {
    /* ACHIEVEMENTS */
    getAchievements: (cb) => achievement.find({}).exec(cb),
    getAchievementsByName: (name, cb) => achievement.find({ name }, { _id: 0, achievement: 0 }).exec(cb),

    /* FOLLOWEDSERIES */
    getFollowedSeries: (userId, cb) => followedSeries.find({ userId, following: true }, { _id: 0, user: 0 }).exec(cb),
    updateFollowedSeries: (userId, seriesId, data, cb) =>
        followedSeries.update({ userId, seriesId }, data, { upsert: true, setDefaultsOnInsert: true }).exec(cb),

    findFollowedSeries: (userId, seriesId, cb) =>
        followedSeries.findOne({ userId, seriesId }, { _id: 0, user: 0, seriesId: 0 }).exec(cb),

    addFollowedSeries: (userId, series, cb) => {
        followedSeries.findOne({ userId, seriesId: series.id }, { following: 1, rating: 1 })
            .exec((err, followed) => {

                if (err) return cb(err);

                series["following"] = followed ? followed.following : false;
                series["rating"] = followed ? followed.rating : -1;

                cb(null, series);
            });
    },

    addFollowedSeriesList: (userId, seriesList, cb) => {
        let results = [];
        async.each(seriesList, (item, cb) =>
            module.exports.addFollowedSeries(userId, item, (err, series) => {
                if (err) return cb(err);
                results.push(series);
                cb();
            }), err => {
                if (err) return cb(err);
                cb(null, results);
            });
    },

    /* EPISODE */
    existsWatchedEpisode: (body, cb) => {
        watchedEpisode
            .count({
                userId: body.userId,
                seriesId: body.seriesId,
                seasonId: body.seasonId,
                episodeId: body.episodeId
            })
            .exec(cb);
    },
    updateWatchedEpisode: (body, cb) => {
        module.exports.existsWatchedEpisode(body, (err, count) => {
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
    getWatchedEpisodesBySeriesSeasonId: (params, user, cb) => {
        watchedEpisode.find({
            userId: user._id,
            seriesId: params.series,
            seasonId: params.season
        }, {
                userId: 0,
                watched: 0,
                __v: 0,
            }).exec(cb);
    },
    
    /* TOKEN */
    getTokenbyUser: (user, osname, browsername, cb) => {
        let cutoff = new Date();
        cutoff.setMonth(cutoff.getMonth() - 6);
        accessToken.findOne({ user, 'device.osname': osname, 'device.browsername': browsername, blocked: false, created: { $gte: cutoff } }, cb);
    },
    getToken: (token, osname, browsername, cb) => {
        let cutoff = new Date();
        cutoff.setMonth(cutoff.getMonth() - 7);
        accessToken.findOne({token, 'device.osname': osname, 'device.browsername': browsername, blocked: false, created: { $gte: cutoff } }, cb);
    },

    /* USER */
    getUser: (id, cb) =>
        user.findById(id, {password:0, providers:0}).exec(cb),

    updateUser: (id, data, cb) => {
        var update = {};
        if(data.name)update.name = data.name;
        if(data.email)update.email = data.email;
        if(data.password)update.name = data.password;
        if(data.picture)update.picture = data.picture;        
        user.findByIdAndUpdate(id, update, cb);
    },

    searchUsers: (query, cb) => {
        let regexStr = query.split(/ /).join('|');
        user.find({
            '$or': [
                { 'name.givenName': { '$regex': regexStr, '$options': 'i' } },
                { 'name.familyName': { '$regex': regexStr, '$options': 'i' } }
            ]
        }, {password:0, providers:0}).exec(cb);
    },

    /* FOLLOWER */
    getFollowers: (userId, cb) => {
        follower.find({ userId }).exec(cb);
    },

    getFollows: (userId, cb) =>
        follower.find({ followerId: userId }).exec(cb),

    getFollower: (userId, followerId, cb) =>
        follower.findOne({ userId, followerId }, {since: 1}).exec((err, data) => {
            if (err) return cb(err);
            cb(null, data ? data.since : null);
        }),

    updateFollower: (userId, followerId, since, cb) => {
        if (since) {
            // update or create
            return follower.update({ userId, followerId }, { since:1 }, { upsert: true, setDefaultsOnInsert: true }).exec(cb);
        }
        // remove
        follower.remove({ userId, followerId }, cb);
    },

    /* FEED */
    addWFEvent: (body, user, cb) => {
        let username = user.name.givenName + ' ' + user.name.familyName;
        let friendname;
        if (body.friend !== undefined) {
            friendname = body.friend.givenName + ' ' + body.friend.familyName;
        }
        let newEvent = new wfevent({
            userId: user._id,
            userName: username,
            message: '',
            url: ''
        });
        let err = new Error('Provided parameters do not form a correct event!');

        if (body.friend !== undefined && body.friend.id !== undefined) {
            if (body.following === undefined) return cb(err);        

            switch (body.following.toString()) {
                case 'true' || true:
                    newEvent.message = ' is now following ' + friendname + '.';
                    break;
                case 'false' || false:
                    newEvent.message = ' is no longer following ' + friendname + '.';
                    break;
                default:
                    return cb(err);
            }
            newEvent.url = '/profile/' + body.friend.id;
            newEvent.save(cb);

        } else if (body.seriesId !== undefined && body.seriesName) {
            if (body.seasonId !== undefined && body.watched !== undefined) {
                if (body.episodeId !== undefined) {
                    switch (body.watched.toString()) {
                        case 'true' || true:
                            newEvent.message = ' has marked ' + body.seriesName + ' season ' + body.seasonId + ' episode ' + body.episodeId + ' as watched.';
                            break;
                        case 'false' || false:
                            newEvent.message = ' has marked ' + body.seriesName + ' season ' + body.seasonId + ' episode ' + body.episodeId + ' as not longer watched.';
                            break;
                    }
                    newEvent.url = '/series/' + body.seriesId + '/season/' + body.seasonId + '/episode/' + body.episodeId;
                    newEvent.save(cb);
                } else {
                    switch (body.watched.toString()) {
                        case 'true' || true:
                            newEvent.message = ' has marked ' + body.seriesName + ' season ' + body.seasonId + ' as watched.';
                            break;
                        case 'false' || false:
                            newEvent.message = ' has marked ' + body.seriesName + ' season ' + body.seasonId + ' as no longer watched.';
                            break;
                    }
                    newEvent.url = '/series/' + body.seriesId;
                    newEvent.save(cb);
                }
            } else if (body.following !== undefined) {
                switch (body.following.toString()) {
                    case 'true':
                        newEvent.message = ' is now following ' + body.seriesName + '.';
                        break;
                    case 'false':
                        newEvent.message = ' is no longer following ' + body.seriesName + '.';
                        break;
                }
                newEvent.url = '/series/' + body.seriesId;
                newEvent.save(cb);
            } else {
                cb(err);
            }
        } else {
            cb(err)
        }
    },
    getWFEventsByUserIds: (userIds, page, cb) => {
        let options = {
            sort: { time: -1 },
            page: page,
            limit: 25
        };
        wfevent.paginate({ userId: { $in: userIds } }, options, function (err, data) {
            cb(err, data);
        });
    }
};