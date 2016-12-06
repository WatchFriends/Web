/*jslint node: true */
"use strict";

var express = require("express"),
    app = express(),
    path = require("path"),
    mongoose = require("mongoose"),
    logger = require("morgan"),
    bodyParser = require("body-parser"), //om request body te gebruiken
    methodOverride = require('method-override'); //om http verbs te gebruiken

//db
mongoose.connect(require("./data/dbConfig").db.development);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", ()=> {

});

//express
app.use(logger("dev"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, "../wwwroot")));

//router
//app.use("/", require("./controllers/index"));
app.use("data", require("./controllers/achievement"));
app.use("data", require("./controllers/series"));

//error handler
app.use((req,res,next)=>{
    var err = new Error("not found");
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
/*
const server = require("./scripts/server"),
    errorControl = require("./controllers/errorControl");

process.on("uncaughtException", function (err) {
    errorControl.writeToErrorLog(err, function (info) {
        console.log("Error written to log file:", info);
    });
});

server.init(5000);
*/