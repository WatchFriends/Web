var service = require("./../data/apiService.js"),
    express = require("express"),
    router = express.Router();

router.get("series/:id", (res, req, next) => service.get(req.params.id, (err, data) => {
    if(err) next(err);
    else res.send(data);
}));

module.exports = router;