var express = require("express"),
    passport = require("passport"),
    router = express.Router();

router.get("/", passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;