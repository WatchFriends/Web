const express = require('express'),
    passport = require('passport'),
    router = express.Router(),
    utils = require('../helpers/utils'),
    errors = require('../helpers/errors'),
    ServerError = errors.ServerError,
    AccessToken = require('../models/accessToken'),
    UAParser = require('ua-parser-js'),
    dbService = require('../data/databaseService'),
    bcrypt = require('bcrypt-nodejs');

let userResult = (token, user) => ({
    token,
    user: {
        email: user.email,
        name: user.name,
        id: user._id
    }
}),
    logOffOnAll = (res, req, next) => {
        AccessToken.find({ user: req.user._id }, (err, currentTokens) => {
            require('async').each(currentTokens, (token, cb) => {
                token.blocked = true;
                currentTokens[i].update(token, (err, raw) => {
                    cb(err);
                });
            }, err => {
                if (err)
                    next(err);
                else {
                    req.logout();
                    return req.json({ message: 'All tokens are blocked.' });
                }
            });
        });
    },

    successful = (req, res, next) => {
        const parser = new UAParser().setUA(req.headers['user-agent']),
            browsername = parser.getBrowser().name,
            os = parser.getOS(),
            osname = `${os.name} ${os.version}`;

        dbService.getTokenbyUser(req.user._id, osname, browsername, (err, result) => {
            if (err) return next(err);
            if (result) {
                let temp = new Date();
                temp.setMonth(temp.getMonth() - 6);
                if (result.created > temp) { // token is valid
                    return res.json(userResult(result.token, req.user));
                }
                result.blocked = true;
                result.save(console.error);
            }
            // nieuwe token
            const token = utils.uid(200);
            let accessToken = new AccessToken({
                user: req.user._id,
                device: {
                    browsername,
                    osname
                },
                token
            });
            accessToken.save((err) => {
                if(err) return next(err);
                res.json(userResult(token, req.user))
            })

            /*bcrypt.hash(token, null, (err, hash) => {
                if(err) return next(err);
                accessToken.token = hash;
                accessToken.save((err) => {
                    if(err) return next(err);
                    res.json(userResult(token, req.user))
                })
            });*/
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
router.get('/logoffonall', logOffOnAll);

//facebook
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/facebook/callback', authenticate('facebook'), successful);

//google
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));
router.get('/google/callback', authenticate('google'), successful);

module.exports = router;