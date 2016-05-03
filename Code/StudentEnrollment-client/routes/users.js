
// var JSX = require('node-jsx').install({harmony: true});
var express = require('express');
var router = express.Router();
// var hello =  require('../components/TweetsApp.react');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', {markup : "<h1>TK</h1>" });
});

module.exports = router;
