const apiService = require("./../data/apiService"),
    dbService = require("./../data/databaseService"),
    express = require("express"),
    router = express.Router(),
    request = require("request"),
    followedSeries = require("../models/followedSeries");

router.get("/series/:id", (req, res, next) => {

    apiService.request(`tv/${req.params.id}?append_to_response=images,similar`, (err, data) => {
        if (err) {
            next(err);
        }
        else if (data === null) {
            next(new Error("Our service is temporarily unavailable"));
        }
        else {
            res.send(data);
        }
    });
});

router.get("/series/:id/season/:season", (req, res, next) => {

    apiService.request(`tv/${req.params.id}/season/${req.params.season}?append_to_response=images,similar`, (err, data) => {
        if (err) {
            next(err);
        }
        else if (data === null) {
            next(new Error("Our service is temporarily unavailable"));
        }
        else {
            res.send(data);
        }
    });
});

router.get("/series/:id/season/:season/episode/:episode", (req, res, next) => {

    apiService.request(`tv/${req.params.id}/season/${req.params.season}/episode/${req.params.episode}?append_to_response=images,similar`, (err, data) => {
        if (err) {
            next(err);
        }
        else if (data === null) {
            next(new Error("Our service is temporarily unavailable"));
        }
        else {
            res.send(data);
        }
    });
});

router.get("/series/get/:page/:pageNumber", (req, res, next) => {

    let page = req.params.pageNumber;
    
    apiService.request(`tv/${req.params.page}?language=en-us&page=${req.params.pageNumber}`, (err, data) => {
        if (err) {
            next(err);
        }
        else if (data === null) {
            next(new Error("Our service is temporarily unavailable"));
        }
        else {
            res.send(data);
        }
    });
});

router.post("/series/follow", (req, res, next) => {
    dbService.updateFollowedSeries(req.body, (err, data) => {
        if (err) {
            next(err);
        }
        else if (data === null) {
            next(new Error("Our service is temporarily unavailable"));
        }
        else {
            res.send(data);
        }
    });
});

router.post("/episode/watch", (req, res, next) => {
    dbService.updateWatchedEpisode(req.body, (err, data) => {
        if (err)
            next(err);
        else if (data === null)
            next(new Error("Our service is temporarily unavailable"));
        else
            res.send(data);
    });
});

router.get('/series/user/following', function (req, res) {
    dbService.getAllFollowedSeriesByUserId(req.user, (err, data) => {
        if (err)
            next(err);
        else if (data === null)
            next(new Error("Our service is temporarily unavailable"));
        else
            res.send(data);
    });
});

router.get('/series/user/:_id/following/', function (req, res) {
    dbService.getAllFollowedSeriesByUserId(req.params, (err, data) => {
        if (err)
            next(err);
        else if (data === null)
            next(new Error("Our service is temporarily unavailable"));
        else
            res.send(data);
    });
});

router.get('/series/user/watched/:series/season/:season', function (req, res) {
    dbService.getWatchedEpisodesBySeriesSeasonId(req.params, req.user, (err, data) => {
        if (err)
            next(err);
        else if (data === null)
            next(new Error("Our service is temporarily unavailable"));
        else
            res.send(data);
    })
});

<<<<<<< HEAD
router.get("/series/search", (req, res, next) => {

    let query = querystring.parse(req.baseUrl).query;

    if (!query) {
        next(new Error('The querystring parameter "query" is required'));
    }
    else {
        apiService.request(`search/tv?query=${query}`, (err, data) => {
            if (err) {
                next(err);
            }
            else {
                res.send(data);
            }
        });
    }
=======
router.get("/series/search/:query", (req, res, next) => {

    apiService.request(`search/tv?query=${req.params.query}`, (err, data) => {
        if (err) {
            next(err);
        }
        else {
            res.send(data);
        }
    });
>>>>>>> refs/remotes/origin/master
});

module.exports = router;