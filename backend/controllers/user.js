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

router.get('/user/:id?', (req, res, next) => {    
    dbService.getUser(req.params.id || req.user.id, (err, data) => {
        if (err) return next(err);        
        let user = {
            id: data._id,
            name: data.name,
            email: data.email,
            picture: data.picture,
            
        };

        let functions = [
            cb => {
                dbService.getFollows(user.id, (err, data) => {
                    if (err) return cb(err);
                    user.follows = data;
                    cb();
                });
            },
            cb => {
                dbService.getFollowers(user.id, (err, data) => {
                    if (err) return cb(err);
                    user.followers = data;
                    cb();
                });
            },
            cb => {
                user.achievements = [];
                cb();
            },
            cb => {
                seriesService.watchlist(user.id, (err, data) => {
                    if (err) return cb(err);
                    user.watchlist = data;
                    cb();
                });
            }
        ];

        each(functions, (f, cb) => f(cb), err => {
            if (err) return next(err);
            res.json(user);
        });
    });


    // dbService.getUser(req.params.id, () => {
    //     callback(res, next);
    // });
});

module.exports = router;
