var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');


var routes = require('./routes/index');
var users = require('./routes/users');
var subjects = require('./routes/subjects');
var studentBySubject= require('./routes/studentBySubject');
var deleteSubject=require('./routes/deleteSubject')

var db = require('./model/db');
var subject = require('./model/subject_model');
var user = require('./model/user_model');


var config = require('./config');
var cors = require('cors');

var app = express();

app.set('superSecret', config.secret); // secret variable

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
 app.use(cors());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
//   next();
// });

app.use('/', routes);
app.use('/users', users);
app.use('/subjects', subjects);
app.use('/studentSubject', studentBySubject);
app.use('/deleteSubject', deleteSubject);



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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
//error: {}
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


module.exports = app;
