var express = require("express"),
    passport = require("passport"),
    router = express.Router();

//local
router.post("/register", passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/auth/register'
}));
router.post("/login", passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}));
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})

//facebook
router.get("/facebook", passport.authenticate('facebook', { scope: "email" }));
router.get("/facebook/callback", passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
}));


module.exports = router;