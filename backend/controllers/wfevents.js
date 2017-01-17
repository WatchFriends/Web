const apiService = require('./../data/apiService'),
    dbService = require('./../data/databaseService'),
    express = require('express'),
    router = express.Router(),
    async = require('async');

const callback = (res, next) =>
    (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data);
    };

router.put('/event', (req, res, next) => {
    dbService.addWFEvent(req.body, req.user, callback(res, next));
});

router.get('/feed', (req, res, next) => {
    dbService.getWFEventsByUserId(req.user._id, callback(res, next));
    /*
    //Get all users friends
    dbService.getFollows(req.user._id, (err, user) => {
        if (err) return next(err);
        let feed = [];
        //Get all activity by those friends
        async.each(user, (item, cb) => {
            dbService.getWFEventsByUserId(req.user._id, (err, events) => {
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
        });
        res.json(feed);
    });
    */
});

module.exports = router;