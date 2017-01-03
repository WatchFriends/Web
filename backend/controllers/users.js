const service = require("./../data/databaseService.js"),
    express = require("express"),
    router = express.Router();

router.get("/user", (req, res, next) => {
    service.getUser((err, data) => {
        if(err) {
            next(err);
        }
        else {
            res.json(data);
        }
    });
});

module.exports = router;