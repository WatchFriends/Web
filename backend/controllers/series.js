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

router.get("/series/:id", (req, res, next) => {
    apiService.request(`tv/${req.params.id}?append_to_response=images,similar`, callback(res, next));
});

router.get("/series/:id/season/:season", (req, res, next) => {

    apiService.request(`tv/${req.params.id}/season/${req.params.season}?append_to_response=images,similar`, callback(res, next));
});

router.get("/series/:id/season/:season/episode/:episode", (req, res, next) => {

    apiService.request(`tv/${req.params.id}/season/${req.params.season}/episode/${req.params.episode}?append_to_response=images,similar`,
        callback(res, next));
});

router.get("/series/popular", (req, res, next) => {
    apiService.request(`tv/popular?language=en-us`, callback(res, next));
});

router.post("/series/follow", (req, res, next) => {
    dbService.updateFollowedSeries(req.body, callback(res, next));
});

router.post("/episode/watch", (req, res, next) => {
    dbService.updateWatchedEpisode(req.body, callback(res, next));
});

router.get('/series/following', (req, res) => {
    dbService.getAllFollowedSeriesByUserId(req.user, callback(res, next));
});

router.get('/series/:_id/following', (req, res) => {
    dbService.getAllFollowedSeriesByUserId(req.params, callback(res, next));
});

router.get('/series/watched/:series/season/:season', (req, res) => {
    dbService.getWatchedEpisodesBySeriesSeasonId(req.params, req.user, callback(res, next));
});


module.exports = router;