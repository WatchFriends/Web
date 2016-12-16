var express = require("express"),
    passport = require("passport"),
    router = express.Router();

router.get("/login", passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/auth/login'
}));

router.get("/facebook", passport.authenticate('facebook', {scope: ["email"]}), (req, res) => res.redirect("/"));

module.exports = router;