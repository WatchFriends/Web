var express = require("express"),
    path = require("path"),
    router = express.Router();

/*router.get("/", (req, res, next) =>{
    console.log(req);
    var err = new Error("not found");
    err.status = 404;
    next(err);
});*/

module.exports = (req, res, next) =>{
    var url = path.join(__dirname,"./../../node_modules", req.url);
    //todo check if file should be allowed to send. 
    res.sendFile(url);
}