/*jslint node: true */
"use strict";

var mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    FacebookStrategy = require("passport-facebook"),
    User = require("../models/user");

// http://passportjs.org/docs/profile
function authify (accessToken, refreshToken, profile, cb) {
    email = profile.emails[0].value;
    User.findOne({ email }, (err, user) => {
        if (err || user) return cb(err, user); //err? -> cb(err), user? -> cb(null, user)
        User.create({
            email,
            name: profile.name,
            provider: profile.provider,
            providerId: profile.id
        }, cb);
    });
}

module.exports = config => {
    passport.serializeUser((user, cb) => cb(null, user.id));

    passport.deserializeUser((id, cb) => User.findById(id, cb));

    passport.use(new LocalStrategy((username, password, cb) => {
        User.findOne({ email: username }, (err, user) => {
            if (err) return cb(err);
            if (!user) return cb(null, false, { message: 'Incorrect username.' });
            if (!user.authenticate(password)) return cb(null, false, { message: 'Incorrect password.' });
            return cb(null, user);
        });
    }));
    //http://passportjs.org/docs/facebook
    passport.use(new FacebookStrategy({
        clientID: config.auth.facebook.key,
        clientSecret: config.auth.facebook.secret,
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'email', 'first_name', 'last_name'], //vraagt enkel specifieke velden op
        enableProof: true //veiligheid (stuurt gehashte clientsecret en requesttoken ipv. enkel de requesttoken)
    }, authify));
};