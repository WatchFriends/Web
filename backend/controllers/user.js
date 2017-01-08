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

router.get('/user/:id', (req, res, next) => {
    dbService.getUser(req.param('id'), callback(res, next));
});

module.exports = router;
