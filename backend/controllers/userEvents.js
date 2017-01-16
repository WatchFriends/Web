const apiService = require('./../data/apiService'),
    dbService = require('./../data/databaseService'),
    express = require('express'),
    router = express.Router(),
    errors = require('../helpers/errors'),
    async = require('async'),
    followedSeries = require('../models/followedSeries');

const callback = (res, next) =>
    (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data);
    };

router.post('/event', (req, res, next) => {
    dbService.addEvent(req.body, req.user, callback(res, next));
});

router.get('/feed', (req, res, next) => {
    //Get all users friends
    dbService.request(`/api/user/${req.user._id}/follows`, (err, user) => {
        if (err) return next(err);
        let feed = [];
        //Get all activity by those friends
        async.each(user, (item, cb) => {
            dbService.getFeedEventsByUserId(req.user._id, (err, events) => {
                if (err) return cb(err);
                feed.push(events);
            });
            cb();
        }, err => {
            if (err) return next(err);
            feed.sort(function (a, b) {
                a = new Date(a.time);
                b = new Date(b.time);
                return a > b ? -1 : a < b ? 1 : 0;
            });
            res.json(feed);
        });
    });
});

module.exports = router;