var express = require("express"),
    app = express(),
    path = require("path"),
    logger = require("morgan"),
    passport = require("passport"),
    session = require("express-session"),
    bodyParser = require("body-parser"), //om request body te gebruiken
    cookieParser = require("cookie-parser"),
    methodOverride = require('method-override'), //om http verbs te gebruiken
    config = require("./data/config.json");

//middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: config.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());

//wwwroot
app.use(express.static(path.join(__dirname, "../wwwroot")));

//routes
app.use(["/data", "/api"], [require("./controllers/achievement"), require("./controllers/series"), require("./controllers/lists")]);
app.use("/login", require("./controllers/login"));
app.use("/auth", require("./controllers/auth"));

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
    res.sendFile(path.join(__dirname,"./error.html"));
});

module.exports = app;
