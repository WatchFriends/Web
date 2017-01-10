const apiService = require("./../data/apiService"),
    dbService = require("./../data/databaseService"),
    utils = require("./../helpers/utils"),
    express = require("express"),
    async = require("async"),
    router = express.Router();

let getLists = (req, res, next) => {
    const user = req.user._id;
    let results = [];

    let functions = [
        //popular
        cb => {
            apiService.request("tv/popular", (err, data) => {
                if (err) return cb(err);
                dbService.addFollowedSeriesList(user, data.results, (err, series) => {
                    if (err) return cb(err);
                    results.push({ series, page: 1, totalPages: data.total_pages });
                    cb();
                });
            });
        },
        // recommended for you
        cb => {
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
                        results.push({ series: data, page: 1, totalPages: 1 })
                        cb();
                    });
                });
            });
        },
        // recommended by friends

        // today on tv
        cb => {
            apiService.request("tv/airing_today", (err, data) => {
                if (err) return cb(err);
                dbService.addFollowedSeriesList(user, data.results, (err, series) => {
                    if (err) return cb(err);
                    results.push({ series, page: 1, totalPages: data.total_pages });
                    cb();
                });
            });
        },
    ];

    async.each(functions, (f, cb) => f(cb), err => {
        if (err) return next(err);
        res.json(results);
    })
};

router.get("/list", getLists);

module.exports = router;