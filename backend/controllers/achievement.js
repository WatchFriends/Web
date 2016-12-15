var service = require("./../data/databaseService.js"),
    express = require("express"),
    router = express.Router();

router.get("/achievement", (req, res, next) => {
    service.getAchievements((err, data) => {
        if(err) {
            next(err);
        }
        else {
            res.json(data);
        }
    });
});

module.exports = router;
