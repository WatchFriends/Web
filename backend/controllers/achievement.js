const service = require("./../data/databaseService.js"),
    express = require("express"),
    router = express.Router();


router.get("/achievement", (req, res, next) => {
    service.getAchievements((err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data);
    });
});

module.exports = router;
