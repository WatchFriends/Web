var express = require('express'),
    passport = require('passport'),
    router = express.Router(),
    utils = require('./../helpers/utils'),
    AccessToken = require('../models/accessToken');

var succesful = (req, res, next) => {
    AccessToken.findOne({ user: req.user._id }, (err, token) => {
        if (err) return next(err);
        if (token)
            return res.json({ //er is al een token actief
                token: token.token,
                user: {
                    name: req.user.name,
                    email: req.user.email
                }
            });
        token = new AccessToken();
        token.user = req.user._id;
        token.token = utils.uid(24);
        token.save((err, product) => {
            if (err) return next(err);
            return res.json({
                token: product.token,
                user: {
                    name: req.user.name,
                    email: req.user.email
                }
            });
        });
    });
};

var authenticate = strategy =>  //stringname strategy voor passport.authenticate
    (req, res, next) =>  //we hebben next nodig
        passport.authenticate(strategy, (err, user, info) => { //custom authenicatie functie om errors als json te versturen
            if (err) return next(err);
            if (!user) {
                err = new Error(info.message || 'Authentication failed');
                err.status = 401;
                return next(err);
            }
            req.logIn(user, err => {
                if (err) return next(err);
                return next();
            });
        })(req, res, next);

//local
router.post('/register', authenticate('register'), succesful);
router.post('/login', authenticate('login'), succesful);
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'logged out succesfully' });
});

//facebook
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/facebook/callback', authenticate('facebook'), succesful);

//google
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));
router.get('/google/callback', authenticate('google'), succesful);

module.exports = router;