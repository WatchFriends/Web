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

router.get('/feed/:page', (req, res, next) => {
    dbService.getFollows(req.user._id, (err, users) => {
        if (err) next(err);
        else {
            let userIds = [];
            for (let i = 0, len = users.length; i < len; i++) {
                userIds.push(users[i].followerId);
            }
            dbService.getWFEventsByUserIds(userIds, req.params.page, callback(res, next));
        }
    });
});

module.exports = router;