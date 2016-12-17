/*jslint node: true */
"use strict";

var mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    FacebookStrategy = require("passport-facebook").Strategy,
    GoogleStrategy = require("passport-google-oauth").OAuth2Strategy, //of OAuthStrategy
    User = require("../models/user");

// http://passportjs.org/docs/profile
function authify (accessToken, refreshToken, profile, cb) {
    email = profile.emails[0].value;
    User.findOne({ email }, (err, user) => {
        if (err) return cb(err); 
        if (user) {
            if (!user.providers) user.providers = [];
            var provider = user.providers.find(provider => provider.name == profile.provider);
            if(!provider) { //nieuwe provider voor dit account
                user.providers.push({
                    name: profile.provider,
                    id: profile.id
                });
                return user.save(err => cb(err, user));
            }
            return cb(null, user)
        }
        user = new User();
        user.email = email;
        user.name = profile.name;
        user.providers[0] = {
            name: profile.provider,
            id: profile.id
        };
        user.save(err => cb(err, user));
    });
}

module.exports = config => {
    passport.serializeUser((user, cb) => cb(null, user.id));

    passport.deserializeUser((id, cb) => User.findById(id, cb));
    //https://github.com/jaredhanson/passport-local
    passport.use("register", new LocalStrategy({ usernameField: "email" }, (email, password, cb) => {
        User.findOne({ email }, (err, user) => {
            if (err) return cb(err);
            if (user) return cb(null, false, { message: 'That e-mail is already taken.' });
            user = new User();
            user.email = email;
            user.password = password; //property setter doet encryptie
            user.save(err => {
                if(err) return cb(err);
                return cb(null, user);
            })
        });
    }));
    passport.use("login", new LocalStrategy({ usernameField: "email" }, (email, password, cb) => {
        User.findOne({ email }, (err, user) => {
            if (err) return cb(err);
            if (!user) return cb(null, false, { message: 'Incorrect e-mail.' });
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
    //https://github.com/jaredhanson/passport-google-oauth2
    passport.use(new GoogleStrategy({
        clientID: config.auth.google.key,
        clientSecret: config.auth.google.secret,
        callbackURL: "/auth/google/callback",
    }, authify));
};