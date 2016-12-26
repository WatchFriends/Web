const apiService = require("./../data/apiService"),
    dbService = require("./../data/databaseService"),
    express = require("express"),
    router = express.Router(),
    request = require("request"),
    users = require("../models/user"),
    userSeries = require("../models/userSeries");

router.get("/series/:id", (req, res, next) => {

    apiService.request(`tv/${req.params.id}?append_to_response=images,similar`, (err, data) => {
        if (err) {
            next(err);
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
        else {
            res.send(data);
        }
    });
});

router.get("/series/popular", (req, res, next) => {
    apiService.request(`tv/popular?language=en-us`, (err, data) => {
        if (err) {
            next(err);
        }
        else {
            res.send(data);
        }
    });
});

router.post("/series/follow", (req, res, next) => {
    users.update({
        "_id": req.body.userId,
        "series": {
            "$not": {
                "$elemMatch": {
                    "seriesId": req.body.seriesId
                }
            }
        }
    }, {
        "$addToSet": {
            "series": {
                "seriesId": req.body.seriesId,
                "following": req.body.following,
                "seasons": []
            }
        }
    }, {multi: true}, (err, data) => {
        if (err)
            next(err);
        else
            res.send(data);
    });

    users.update({
        "_id": req.body.userId,
        "series.seriesId": req.body.seriesId
    }, {
        "$set": {
            "series.$.following": req.body.following
        }
    }, {multi: true}, (err) => {
        if (err)
            next(err);
    });
});

module.exports = router;