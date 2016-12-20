var express = require("express"),
    passport = require("passport"),
    router = express.Router(),
    utils = require("./../helpers/utils"),
    AccessToken = require("../models/accessToken");

var successful = (req, res, next) => {
    var token = new AccessToken();
    token.user = req.user._id;
    token.token = utils.uid(24);
    token.save((err, product)=> {
        if(err)next(err);
        res.json({
            token: product.token,
            user: {
                name: req.user.name,
                email: req.user.email
            }
        });
    })
};

//local
router.post("/register", passport.authenticate('register'), successful);
router.post("/login", passport.authenticate('login'), successful);
router.get("/logout", (req, res) => {
    req.logout();
    res.json({message: "logged out succesfully"});
})

//facebook
router.get("/facebook", passport.authenticate('facebook', { scope: "email" }));
router.get("/facebook/callback", passport.authenticate('facebook'), successful);

//google
router.get("/google", passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));
router.get("/google/callback", passport.authenticate('google'), successful);

module.exports = router;