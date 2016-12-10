const service = require("./../data/apiService.js"),
      express = require("express"),
      router = express.Router(),
      request = require("request");

router.get("/series/:id", (req, res, next) => {

    req.headers.accept = "application/json";

    let requested = (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }
        else {
            next(error);
        }
    },
    gotUrl = (err, url) => {

        if (err) {
            next(err);
        }
        else {
            request(url, requested);
        }
    };

    service.url(`tv/${req.params.id}?append_to_response=images,similar`, gotUrl);
});

module.exports = router;