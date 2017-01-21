const dbService = require('../data/databaseService.js'),
    express = require('express'),
    router = express.Router(),
    each = require('async').each,
    seriesService = require('../service/series');

const callback = (res, next) =>
    (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data);
    };

router.get('/user/search/:query', (req, res, next) => {
    dbService.searchUsers(req.params.query, callback(res, next));
});

router.get('/user/:id/followers', (req, res, next) => {
    dbService.getFollowers(req.params.id, callback(res, next));
});

router.get('/user/:id/follows', (req, res, next) => {
    dbService.getFollows(req.params.id, callback(res, next));
});

router.get('/user/:follower/follows/:followed', (req, res, next) => {
    dbService.getFollower(req.params.followed, req.params.follower, callback(res, next));
});

router.put('/user/:follower/follows/:followed', (req, res, next) => {
    dbService.update(req.params.followed, req.params.follower, req.params.follows ? Date.now() : null, callback(res, next));
});

router.get('/user/:id', (req, res, next) => {

    let user = {
        id: req.params.id,
        friends: {
            followers: [],
            follows: []
        }
    };

    let functions = [
        cb => dbService.getUser(user.id, (err, data) => {
            if (err) return cb(err);

            user["email"] = data._doc.email;
            user["name"] = data._doc.name;
            cb();
        }),
        cb => {
            dbService.getFollows(user.id, (err, data) => {
                if (err) return cb(err);

                user.friends.follows = data;
                cb();
            });
        },
        cb => {
            dbService.getFollowers(user.id, (err, data) => {
                if (err) return cb(err);

                user.friends.followers = data;
                cb();
            });
        },
        cb => {
            require('../service/achievement').checkAchievements((err, data) => {
                if (err) {
                    cb(err);
                }
                else {
                    user["achievements"] = data;
                }
            });
        },
        cb => {

            seriesService.watchlist(user.id, (err, data) => {
                if (err) cb(err);
                user["watchlist"] = data;
                cb();
            });
        }
    ];

    each(functions, (f, cb) => f(cb), err => {
        if (err) next(err);
        res.json(user);
    });

    // dbService.getUser(req.params.id, () => {
    //     callback(res, next);
    // });
});

module.exports = router;
