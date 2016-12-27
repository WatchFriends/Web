/*jslint node: true */
'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy, //of OAuthStrategy
    BearerStrategy = require('passport-http-bearer').Strategy,
    User = require('../models/user'),
    AccessToken = require('../models/accessToken');

// http://passportjs.org/docs/profile
var authify = (accessToken, refreshToken, profile, cb) => {
    var email = profile.emails[0].value;
    User.findOne({ email }, (err, user) => {
        if (err) return cb(err);
        if (user) {
            if (!user.providers) user.providers = [];
            var provider = user.providers.find(provider => provider.name == profile.provider);
            if (!provider) { //nieuwe provider voor dit account, user moet al ingelogd zijn om dit te mogen doen.
                user.providers.push({
                    name: profile.provider,
                    id: profile.id,
                    token: accessToken
                });
                return user.save(err => cb(err, user));
            }
            return cb(null, user);
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
};

module.exports = config => {
    passport.serializeUser((user, cb) => {
        console.log(`serialize: ${user._id}`);
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        console.log(`deserialize: ${id}`);
        User.findById(id, cb);
    });

    //https://github.com/jaredhanson/passport-local
    passport.use('register', new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, cb) =>
        //todo first- and last name
        User.findOne({ email }, (err, user) => {
            if (err) return cb(err);
            if (user) return cb(null, false, { message: 'That e-mail is already taken.' });
            user = new User();
            user.name = {
                familyName: req.body.lastname,
                middleName: req.body.middlename,
                givenName: req.body.firstname,
            };
            user.email = email;
            user.password = password; //property setter doet encryptie
            user.save(err => {
                if (err) return cb(err);
                return cb(null, user);
            });
        })
    ));
    passport.use('login', new LocalStrategy({ usernameField: 'email' }, (email, password, cb) => {
        User.findOne({ email }, (err, user) => {
            if (err) return cb(err);
            if (!user) return cb(null, false, { message: 'Incorrect e-mail.' });
            if (!user.password) return cb(null, false, { message: 'Log in using Google+ or Facebook.' });
            user.authenticate(password, (err, ok) => {
                if (err) return cb(err);
                if (ok) return cb(null, user);
                return cb(null, false, { message: 'Incorrect password.' });
            });
        });
    }));

    //http://passportjs.org/docs/facebook
    passport.use(new FacebookStrategy({
        clientID: config.auth.facebook.key,
        clientSecret: config.auth.facebook.secret,
        callbackURL: '/api/auth/facebook/callback',
        profileFields: ['id', 'email', 'first_name', 'last_name'], //vraagt enkel specifieke velden op
        enableProof: true //veiligheid (stuurt gehashte clientsecret en requesttoken ipv. enkel de requesttoken)
    }, authify));
    //https://github.com/jaredhanson/passport-google-oauth2
    passport.use(new GoogleStrategy({
        clientID: config.auth.google.key,
        clientSecret: config.auth.google.secret,
        callbackURL: '/api/auth/google/callback',
    }, authify));

    passport.use(new BearerStrategy((token, cb) =>
        AccessToken.findOne({ token }, (err, accessToken) => {
            if (err) return cb(err);
            if (!accessToken) return cb(null, false);
            User.findById(accessToken.user, (err, user) => {
                if (err) return cb(err);
                if (!user) return cb(new Error('No user was found for this access token user id.'));
                cb(null, user);
            });
        })
    ));
};