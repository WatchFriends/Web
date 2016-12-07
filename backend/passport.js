/*jslint node: true */
"use strict";

var mongoose = require("mongoose"),
    passport = require("passport"),
    User = mongoose.Model("User");


module.exports = (passport, config) => {
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => User.findOne({id}, (err, user) => done(err,user)));

};