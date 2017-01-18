const express = require('express'),
    passport = require('passport'),
    router = express.Router(),
    utils = require('../helpers/utils'),
    errors = require('../helpers/errors'),
    ServerError = errors.ServerError,
    AccessToken = require('../models/accessToken');

let userResult = (token, user) => ({
    token,
    user: {
        email: user.email,
        name: user.name,
        id: user._id
    }
}),

    successful = (req, res, next) => {
        AccessToken.findOne({ user: req.user._id }, (err, token) => {
            if (err) return next(err);
            if (token)
                return res.json(userResult(token.token, req.user));

            token = new AccessToken();
            token.user = req.user._id;
            token.token = utils.uid(200);
            token.save((err, product) => {
                if (err) return next(err);
                return res.json(userResult(product.token, req.user));
            });
        });
    },

    authenticate = strategy =>  //stringname strategy voor passport.authenticate
        (req, res, next) =>  //we hebben next nodig
            passport.authenticate(strategy, (err, user, info) => { //custom authenicatie functie om errors als json te versturen
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next(new ServerError(info.message || 'Authentication failed', errors.unauthorized));
                }
                req.logIn(user, err => {
                    if (err) {
                        return next(err);
                    }
                    return next();
                });
            })(req, res, next);

//local
router.post('/register', authenticate('register'), successful);
router.post('/login', authenticate('login'), successful);
router.get('/login', authenticate('bearer'), successful);
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'logged out successfully' });
});

//facebook
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/facebook/callback', authenticate('facebook'), successful);

//google
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));
router.get('/google/callback', authenticate('google'), successful);

module.exports = router;