var service = require("./../data/databaseService.js"),
    express = require("express"),
    router = express.Router();

var callback = (res, next) =>
    (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data);
    }


router.get("/achievement", (req, res, next) => {
    service.getAchievements(callback(res, next));
});

module.exports = router;
