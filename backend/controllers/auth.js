var express = require("express"),
    passport = require("passport"),
    router = express.Router();

//local
router.post("/register", passport.authenticate('register'));
router.post("/login", passport.authenticate('login'));
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})

//facebook
router.get("/facebook", passport.authenticate('facebook', { scope: "email" }));
router.get("/facebook/callback", passport.authenticate('facebook'));

//google
router.get("/google", passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));
router.get("/google/callback", passport.authenticate('google'));

module.exports = router;