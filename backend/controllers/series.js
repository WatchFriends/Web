const service = require("./../data/apiService.js"),
      express = require("express"),
      router = express.Router(),
      request = require("request");

router.get("/series/:id", (req, res, next) => {

    service.request(`tv/${req.params.id}?append_to_response=images,similar`, (err, data) => {
        if (err) {
            next(err);
        }
        else {
            res.send(data);
        }
    });
});

router.get("/series/:id/seasons/:season", (req, res, next) => {

    service.request(`tv/${req.params.id}/season/${req.params.season}?append_to_response=images,similar`, (err, data) => {
        if (err) {
            next(err);
        }
        else {
            res.send(data);
        }
    });
});

router.get("/series/:id/seasons/:season/episode/:espisode", (req, res, next) => {

    service.request(`tv/${req.params.id}/season/${req.params.season}/episode/${req.params.episode}?append_to_response=images,similar`, (err, data) => {
        if (err) {
            next(err);
        }
        else {
            res.send(data);
        }
    });
});


module.exports = router;