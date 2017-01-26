const apiService = require("./../data/apiService"),
    dbService = require("./../data/databaseService"),
    utils = require("./../helpers/utils"),
    express = require("express"),
    async = require("async"),
    router = express.Router();

let getLists = (req, res, next) => {
    const user = req.user._id;
    let lists = [];

    let functions = [
        //popular
        cb => {
            apiService.request("tv/popular", (err, data) => {
                if (err) return cb(err);
                dbService.addFollowedSeriesList(user, data.results, (err, results) => {
                    if (err) return cb(err);
                    lists.push({ results, page: 1, totalPages: data.total_pages, apiRequest: '/series/popular', name: 'popular', totalResults: data.total_results});
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
                    series.addUniqueValues(data.results, (series) => series.id);
                    cb();
                });
            };

            dbService.getFollowedSeries(user, (err, data) => {
                if (err) return cb(err);
                if (data === null || !data.length) return cb();
                if(data.length > 5)
                    data = data.random(4);
                async.each(data, getsimilarseries, err => {
                    if (err) return cb(err);
                    dbService.addFollowedSeriesList(user, series, (err, results) => {
                        if (err) return cb(err);
                        lists.push({ results, page: 1, totalPages: 1, name: 'recommended', totalResults: data.length });
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
                dbService.addFollowedSeriesList(user, data.results, (err, results) => {
                    if (err) return cb(err);
                    lists.push({ results, page: 1, totalPages: data.total_pages, apiRequest: '/series/today', name: 'today', totalResults: data.total_results });
                    cb();
                });
            });
        },
    ];

    async.each(functions, (f, cb) => f(cb), err => {
        if (err) return next(err);
        res.json(lists);
    })
};

router.get("/list", getLists);

module.exports = router;