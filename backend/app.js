var express = require("express"),
    app = express(),
    path = require("path"),
    logger = require("morgan"),
    bodyParser = require("body-parser"), //om request body te gebruiken
    methodOverride = require('method-override'); //om http verbs te gebruiken

//middleware
app.use(logger("dev"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride('X-HTTP-Method-Override'));

//wwwroot
app.use(express.static(path.join(__dirname, "../wwwroot")));

//routes
app.use("/module", require("./controllers/module"));
app.use(["/data", "/api"], [require("./controllers/achievement"), require("./controllers/series"), require("./controllers/lists")]);

//error handler
app.use(["/data", "/api"], (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({});//empty object
});
app.use((req, res, next) => {
    var err = new Error("not found");
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.sendFile(path.join(__dirname,"../wwwroot/error.html"));
});

module.exports = app;
