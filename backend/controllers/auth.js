var express = require("express"),
    passport = require("passport"),
    router = express.Router();

router.get("/facebook", passport.authenticate('facebook'), (req, res) => res.redirect("/"));

module.exports = router;