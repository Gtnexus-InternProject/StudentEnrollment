/**
 * Created by hrajapaksha on 4/18/2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

//// route middleware to verify a token
//router.use(function(req, res, next) {
//
//  // check header or url parameters or post parameters for token
//  var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//  // decode token
//  if (token) {
//
//    // verifies secret and checks exp
//    jwt.verify(token, config.secret, function(err, decoded) {
//      if (err) {
//        return res.json({ success: false, message: 'Failed to authenticate token.' });
//      } else {
//        // if everything is good, save to request for use in other routes
//        req.decoded = decoded;
//        next();
//      }
//    });
//
//  } else {
//
//    // if there is no token
//    // return an error
//    return res.status(403).send({
//        success: false,
//        message: 'No token provided.'
//    });
//
//  }
//});


router.route('/studentPerSubject/:id')
    .get(function(req, res) {
        mongoose.model('student_model').find({subjects:req.params.id},{userId:1, firstName: 1,lastName: 1,email:1 }, function (err, resultUser) {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
            } else {
                console.log('GET Retrieving ID: ' + resultUser._id);

                res.format({
                    json: function(){
                        res.json(resultUser);
                    }
                });
            }
        });
    });
router.route('/subjectPerStudent/:id')
    .get(function(req, res) {
      //  mongoose.model('student_model').find({userName:"w"}, {subjects:1}, function (err, resultSubjects) {
        mongoose.model('student_model').find({userName:req.params.id}, {subjects:1}, function (err, resultSubjects) {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
            } else {
                console.log('GET Retrieving ID: ' + resultSubjects._id);

                res.format({
                    json: function(){
                        res.json(resultSubjects);
                    }
                });
            }
        });
    });

module.exports = router;

