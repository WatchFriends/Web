const apiService = require('./../data/apiService'),
    dbService = require('./../data/databaseService'),
    express = require('express'),
    router = express.Router(),
    request = require('request'),
    errors = require('../helpers/errors'),
    ServerError = errors.ServerError,
    async = require('async'),
    followedSeries = require('../models/followedSeries');

const callback = (res, next) =>
    (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data);
    };

const pagesCallback = (req, res, next) => 
    (err, page) => {
        if(err) return next(err);
        dbService.addFollowedSeriesList(req.user._id, page.results, (err, series) => {
            if(err) return next(err);
            page.results = series;
            res.json(page)
        });
    }

router.get('/series/search', (req, res, next) => {
    let query = req.query.query;

    if (!query) {
        return next(new ServerError('The querystring parameter "query" is required', errors.badRequest));
    }
    apiService.request(`search/tv?query=${query}`, pagesCallback(req, res, next));
});

router.get('/series/popular', (req, res, next) => {
    apiService.request(`tv/popular?language=en-us`, pagesCallback(req, res, next));
});


router.get('/series/:id/season/:season', (req, res, next) => {
    apiService.request(`tv/${req.params.id}/season/${req.params.season}?append_to_response=images,similar`, callback(res, next));

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
    dbService.getFollowedSeries(req.params.user || req.user._id, (err, data) => {
        if(err) return next(err);
        let results = [];
        // voor ieder followed object een series opvragen
        async.each(data, (item, cb) => {
            apiService.request(`tv/${item.seriesId}?append_to_response=images,similar`, (err, series) => {
                if(err) return cb(err);
                results.push({
                    series,
                    following: item.following,
                    rating: item.rating
                });
                cb();
            });
        }, err => {
            if(err) return next(err);
            res.json(results);
        });
    });
});

router.put('/followed/:series', (req, res, next) => {
    var data = {};
    if (req.body.following) data.following = req.body.following;
    if (req.body.rating) data.rating = req.body.rating;
    if (data === {}) {
        return next(new ServerError('At least one of these body values are required: following, rating', errors.badRequest));
    }
    dbService.updateFollowedSeries(req.body.user || req.user._id, req.params.series, data, callback(res, next));
});

router.get('/series/:id', (req, res, next) => {
    apiService.request(`tv/${req.params.id}?append_to_response=images,similar`, (err, series) => {
        if(err) return next(err);
        dbService.addFollowedSeries(req.user.id, series, callback(res, next));
    });
});

module.exports = router;
