const dbService = require('../data/databaseService.js'),
    express = require('express'),
    router = express.Router();

const callback = (res, next) =>
    (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data);
    };

router.get('/user/search/:query', (req, res, next) => {
    dbService.searchUsers(req.param('query'), callback(res, next));
});

router.get('/user/:id/followers' , (req, res, next) => {
    dbService.getFollowers(req.param('id'), callback(res, next));
});

router.get('/user/:id/follows' , (req, res, next) => {
    dbService.getFollows(req.param('id'), callback(res, next));    
});

router.get('/user/:follower/follows/:followed' , (req, res, next) => {
    dbService.getFollower(req.param('followed'), req.param('follower'), callback(res, next));    
});

router.put('/user/:follower/follows/:followed' , (req, res, next) => {
    dbService.update(req.param('followed'), req.param('follower'), req.param('follows') ? Date.now() : null, callback(res, next));    
});

router.get('/user/:id', (req, res, next) => {
    dbService.getUser(req.param('id'), callback(res, next));
});

module.exports = router;
