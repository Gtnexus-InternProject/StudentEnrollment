var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes');
var exphbs = require('express-handlebars');
var users = require('./routes/users');
var index = require('./routes/index');



var app = express();

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

var config = require("./webpack.config"),
webpack = require("webpack"),
webPackDevMiddleware = require('webpack-dev-middleware'),
webpackHotMiddleware = require('webpack-hot-middleware');
var compiler = webpack(config);

app.use(webPackDevMiddleware(compiler, {
  publicPath : config.output.publicPath,
  stats: {colors: true},
  hot: true,
  inline: true,
  progress: true
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log,  heartbeat: 10 * 1000, path: '/__webpack_hmr'
}));


app.use('/', index);
app.use('/users', users);




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
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
