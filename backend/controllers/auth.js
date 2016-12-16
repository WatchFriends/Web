var express = require("express"),
    passport = require("passport"),
    router = express.Router();

router.get("/login", passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/auth/login'
}));

router.get("/facebook", passport.authenticate('facebook'), (req, res) => res.redirect("/"));

module.exports = router;