var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request'); // "Request" library
var querystring = require('querystring');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var passport = require('passport');
require('dotenv').load();

var routes = require('./routes/index');
var users = require('./routes/users');
var db = require('./routes/db');
var wcbracket = require('./routes/wcbracket');

var app = express();



var forceSsl = function (req, res, next) {
   if (req.headers['x-forwarded-proto'] !== 'https') {
       return res.redirect(301, ['https://', req.get('Host'), req.url].join(''));
   }
   return next();
};

if (app.get('env') === 'production') {
  app.use(forceSsl);
}

if (app.get('env') === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
}


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
require('./config/passport.js');

app.use('/', routes);
app.use('/users', users);
app.use('/db', db);
app.use('/wcbracket', wcbracket);
app.use('/nba-all-star-api', function(req, res, next){
  res.sendFile('public/nba-all-star-api.json', { root: __dirname });
})

app.all('/*', function(req, res, next){
  res.sendFile('public/index.html', { root: __dirname });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {}
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
