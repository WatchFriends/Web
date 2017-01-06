const express = require('express'),
    app = express(),
    path = require('path'),
    logger = require('morgan'),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser'), //om request body te gebruiken
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'), //om http verbs te gebruiken
    errors = require('./helpers/errors'),
    ServerError = errors.ServerError,
    config = require('./data/config.json');

//middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
//app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize());
//app.use(passport.session());

//wwwroot
app.use(express.static(path.join(__dirname, '../wwwroot')));

//routes
app.use('/api/auth', require('./controllers/auth'));
app.use(['/data', '/api'], [
    passport.authenticate('bearer'),
    require('./controllers/achievement'),
    require('./controllers/series'),
    require('./controllers/list'),
    (req, res, next) => { //geen route beschikbaar
        next(new ServerError(`Api route ${req.url} not found`, errors.notFound));
    },
    (err, req, res, next) => {
        const status = err.status || 500;
        res.status(status);
        res.json({ message: err.message || err || 'Server error', status});
    }
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
