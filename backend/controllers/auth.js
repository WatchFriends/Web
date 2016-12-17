var express = require("express"),
    passport = require("passport"),
    router = express.Router();

router.post("/register", passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/auth/register'
}));
router.post("/login", passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}));

router.get("/facebook/callback", passport.authenticate('facebook', { scope: "email" }));

router.get("/facebook", passport.authenticate('facebook', { scope: "email" }, {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;