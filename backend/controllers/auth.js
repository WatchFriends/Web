const express = require('express'),
    passport = require('passport'),
    router = express.Router(),
    utils = require('../helpers/utils'),
    errors = require('../helpers/errors'),
    ServerError = errors.ServerError,
    AccessToken = require('../models/accessToken'),
    UAParser = require('ua-parser-js'),
    hash = require('password-hash');

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
                    if (err) next(err);
                    cb();
                });
            }, err => {
                if (err)
                    next(err);
                else {
                    req.logout();
                    return req.json({ message: "All tokens are blocked." });
                }
            });
        });
    },

    successful = (req, res, next) => {
        AccessToken.find({ user: req.user._id }, (err, currentTokens) => {

            if (err) return next(err);

            let parser = new UAParser().setUA(req.headers['user-agent']),
                browsername = parser.getBrowser().name,
                osname = `${parser.getOS().name} ${parser.getOS().version}`,
                lenght = currentTokens.length,
                currentDate = new Date(),
                headerToken = req.headers.authorization != null ? req.headers.authorization.substring(6) : "";//.substring(6);

            if (currentTokens && lenght !== 0) {
                for (let i = lenght; i--;) {

                    let iToken = currentTokens[i]._doc;

                    if (iToken.device.browsername === browsername && iToken.device.osname === osname && !iToken.blocked && hash.verify(headerToken, iToken)) {

                        let temp = new Date();
                        temp.setMonth(temp.getMonth() - 6);
                        if (iToken.created <= temp) {
                            // nieuwe token nodig.
                            iToken.blocked = true;
                            currentTokens[i].update(iToken, (err, raw) => {
                                if (err) next(err);
                            });
                        }
                        else {

                            iToken.created = currentDate.toISOString();

                            currentTokens[i].update(iToken, (err, raw) => {
                                if (err) next(err);
                            });

                            return res.json(userResult(iToken.token, req.user));
                        }
                    }
                }
            }

            currentTokens = new AccessToken();
            currentTokens.created = currentDate.toISOString();
            currentTokens.user = req.user._id;
            currentTokens.device = {
                browsername,
                osname
            };

            let t = utils.uid(200);

            currentTokens.token = hash.generate(t);

            currentTokens.save((err, product) => {
                if (err) return next(err);
                return res.json(userResult(t, req.user));
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
router.get('/logoffonall', logOffOnAll);

//facebook
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/facebook/callback', authenticate('facebook'), successful);

//google
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));
router.get('/google/callback', authenticate('google'), successful);

module.exports = router;