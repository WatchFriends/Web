/*jslint node: true */
"use strict";

var mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    FacebookStrategy = require("passport-facebook"),
    User = require("../models/user");

module.exports = config => {
    passport.serializeUser((user, cb) => cb(null, user.id));

    passport.deserializeUser((id, cb) => User.findOne({ _id:id }, cb));

    passport.use(new LocalStrategy((name, password, cb) => {
        User.findOne({ name }, (err, user) => {
        if (err)  
            return cb(err); 
        if (!user) 
            return cb(null, false, { message: 'Incorrect username.' });        
        if (!user.authenticate(password)) 
            return cb(null, false, { message: 'Incorrect password.' });        
        return cb(null, user);
        });
    }));

    passport.use(new FacebookStrategy({
        clientID: config.auth.facebook.key,
        clientSecret: config.auth.facebook.secret,
        callbackURL: "/auth/facebook/callback"
    }, (accessToken, refreshToken, profile, cb) => process.nextTick(() => cb(null, profile))
    ));
};