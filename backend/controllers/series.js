const apiService = require('../data/apiService'),
    dbService = require('../data/databaseService'),
    express = require('express'),
    router = express.Router(),
    request = require('request'),
    errors = require('../helpers/errors'),
    ServerError = errors.ServerError,
    async = require('async'),
    followedSeries = require('../models/followedSeries'),
    seriesService = require('../service/series');

const callback = (res, next) =>
    (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data);
    };

const pagesCallback = (req, res, next) =>
    (err, page) => {
        if (err) return next(err);
        dbService.addFollowedSeriesList(req.user._id, page.results, (err, series) => {
            if (err) return next(err);
            page.results = series;
            res.json(page)
        });
    };

router.get('/series/search/:query/:page', (req, res, next) => {
    apiService.request(`search/tv?query=${req.params.query}&page=${req.params.page}`, pagesCallback(req, res, next));
});

router.get('/series/popular/:page', (req, res, next) => {
    apiService.request(`tv/popular?language=en-us?page=${req.params.page}`, pagesCallback(req, res, next));
});

router.get('/series/today/:page', (req, res, next) => {
    apiService.request(`tv/airing_today?language=en-us?page=${req.params.page}`, pagesCallback(req, res, next));
});

router.get('/series/recommended', (req, res, next) => {
    let series = [];
    let getsimilarseries = (followed, cb) => {
        apiService.request(`tv/${followed.seriesId}/similar`, (err, data) => {
            if (err) return cb(err);
            series = Array.prototype.push.apply(series, data.results);
            cb();
        });
    };

    dbService.getFollowedSeries(user, (err, data) => {
        if (err) return cb(err);
        if (data === null || !data.length) return cb();
        async.each(data, getsimilarseries, err => {
            if (err) return cb(err);
            dbService.addFollowedSeriesList(user, series, (err, data) => {
                if (err) return cb(err);
                results.push({ series: data, page: 1, total_pages: 1, total_results: data.length })
                cb();
            });
        });
    });
});


router.get('/series/:id/season/:season', (req, res, next) => {
    apiService.request(`tv/${req.params.id}/season/${req.params.season}?append_to_response=images,similar`, callback(res, next));
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

router.get('/series/:id/season/:season/episode/:episode', (req, res, next) => {
    apiService.request(`tv/${req.params.id}/season/${req.params.season}/episode/${req.params.episode}?append_to_response=images,similar`,
        callback(res, next));
});

router.get('/followed', (req, res, next) => {
    //user in querystring voor andere user, niets voor ingelogde user.    
    seriesService.watchlist(req.params.user || req.user._id, callback(res, next));
});

router.put('/followed/:series', (req, res, next) => {
    dbService.updateFollowedSeries(req.body.user || req.user._id, req.params.series, req.body, callback(res, next));
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



router.get("/series/search/:query/:page", (req, res, next) => {

    apiService.request(`search/tv?query=${req.params.query}&page=${req.params.page}`, (err, data) => {

    if (err) {
        next(err);
    }
    else {
        res.send(data);

        }
    });
});
router.get('/series/:id', (req, res, next) => {
    apiService.request(`tv/${req.params.id}?append_to_response=images,similar`, (err, series) => {
        if (err) return next(err);
        dbService.addFollowedSeries(req.user.id, series, callback(res, next));

    });
});

module.exports = router;
