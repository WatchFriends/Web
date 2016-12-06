var service = require("./../data/databaseService.js"),
    express = require("express"),
    router = express.Router();

router.get("achievement/", (res, req, next) => service.get(req.params.id, (err, data) => {
    if(err) next(err);
    else res.json(data);
}));

module.exports = router;
