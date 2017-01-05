const service = require("./../data/databaseService.js"),
    express = require("express"),
    router = express.Router();


router.get("/achievement", (req, res, next) => {
    service.getAchievements((err, data) => {
        if (err) {
            return next(err);
        }
        if (data === null) {
            return next(new Error("Our service is temporarily unavailable"));
        }
        res.json(data);
    });
});

module.exports = router;
