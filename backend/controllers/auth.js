var express = require("express"),
    passport = require("passport"),
    router = express.Router(),
    utils = require("./../helpers/utils"),
    AccessToken = require("../models/accessToken");

var successful = (req, res, next) => {
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
    })
};

var log = (req,res,next) =>{
    console.dir(req.body);
    next();
}

//local
router.post("/register", passport.authenticate('register'), successful);
router.post("/login",log, passport.authenticate('login'), successful);
router.get("/logout", (req, res) => {
    req.logout();
    res.json({ message: "logged out succesfully" });
})

//facebook
router.get("/facebook", passport.authenticate('facebook', { scope: "email" }));
router.get("/facebook/callback", passport.authenticate('facebook'), successful);

//google
router.get("/google", passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));
router.get("/google/callback", passport.authenticate('google'), successful);

module.exports = router;