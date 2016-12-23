var express = require('express'),
    app = express(),
    path = require('path'),
    logger = require('morgan'),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser'), //om request body te gebruiken
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'), //om http verbs te gebruiken
    config = require('./data/config.json');

//middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

//wwwroot
app.use(express.static(path.join(__dirname, '../wwwroot')));

//routes
app.use('/api/auth', require('./controllers/auth'));
app.use(['/data', '/api'], [
    //passport.authenticate('bearer'),
    require('./controllers/achievement'),
    require('./controllers/series'),
    require('./controllers/list'),
    (req, res, next) => { //geen route beschikbaar
        var error = new Error('Api route not found')
        error.status = 404;
        next(error);
    },
    (err, req, res, next) =>
        res.json({ error: { message: err.message || 'Server error', status: err.status || 500 } })
]);

//error handler
app.use((req, res, next) =>
    //kan een angular route zijn, of een file die niet bestaat
    res.sendFile(path.join(__dirname, './../wwwroot/index.html'))
);
app.use((err, req, res, next) => {
    res.locals.message = err.messsage;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname, './error.html')); //todo view engine -> beter code tonen
});

module.exports = app;
