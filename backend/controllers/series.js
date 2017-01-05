const apiService = require("./../data/apiService"),
    dbService = require("./../data/databaseService"),
    express = require("express"),
    router = express.Router(),
    request = require("request"),
    followedSeries = require("../models/followedSeries");

var callback = (res, next) =>
    (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data);
    }

router.get("/series/search", (req, res, next) => {

    let query = req.query.query;

    if (!query) {
        var err = new Error('The querystring parameter "query" is required');
        err.status = 400;
        return next(err);
    }
    apiService.request(`search/tv?query=${query}`, callback(res, next));

});

router.get("/series/popular", (req, res, next) => {
    apiService.request(`tv/popular?language=en-us`, callback(res, next));
});


router.get("/series/:id/season/:season", (req, res, next) => {

    apiService.request(`tv/${req.params.id}/season/${req.params.season}?append_to_response=images,similar`, callback(res, next));
});

router.get("/series/:id/season/:season/episode/:episode", (req, res, next) => {

    apiService.request(`tv/${req.params.id}/season/${req.params.season}/episode/${req.params.episode}?append_to_response=images,similar`,
        callback(res, next));
});

router.get("/followed", (req, res, next) => {
    //user in querystring voor andere user, niets voor ingelogde user.
    dbService.getFollowedSeries(req.params.user || req.user._id, callback(res, next));
});
router.put("/followed/:series", (req, res, next) => {
    dbService.updateFollowedSeries(req.body.user || req.user._id, req.params.series, req.body.following, req.body.rating, callback(res, next));
});
router.get('/followed/:series', (req, res, next) => {
    dbService.findFollowedSeries(req.params.user || req.user._id, req.params.series, callback(res, next));
});

router.get("/series/:id", (req, res, next) => {
    apiService.request(`tv/${req.params.id}?append_to_response=images,similar`, callback(res, next));
});

module.exports = router;