const service = require("./../data/databaseService.js"),
      express = require("express"),
      router = express.Router();

router.get("/achievement", (req, res, next) => {
    service.getAchievements((err, data) => {
        if(err) {
            next(err);
        }
        else if (data === null) {
            next(new Error("Our service is temporarily unavaiable"));
        }
        else {
            res.json(data);
        }
    });
});

module.exports = router;
