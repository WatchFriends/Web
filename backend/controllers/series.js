var service = require("./../data/apiService.js"),
    express = require("express"),
    router = express.Router();

router.get("/series/:id", (req, res, next) => 
    service.getSeries(req.params.id, (err, data) => {
        if(err) next(err);
        else res.send(data);
    }));

module.exports = router;