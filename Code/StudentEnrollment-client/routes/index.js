var JSX = require('node-jsx').install({
    harmony: true
});
require('babel-core/register')({
    presets: ['es2015', 'react']
})
var React = require('react'),
    ReactDOMServer = require('react-dom/server');
var hello = React.createFactory(require('../components/hello.react'));

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var markup = ReactDOMServer.renderToString(
        hello({

        })
    );
    console.log(markup);
    // Render our 'home' template
    res.render('index', {
        markup: markup
    });

});

module.exports = router;
