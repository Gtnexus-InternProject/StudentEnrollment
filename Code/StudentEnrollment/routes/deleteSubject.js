/**
 * Created by hrajapaksha on 4/19/2016.
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


router.delete('/:id/edit', function (req, res){
    //find blob by ID
    mongoose.model('subject_model').findOneAndRemove({moduleCode:"wqef"}, function (err, blob) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            //blob.remove(function (err, blob) {
            //    if (err) {
            //        return console.error(err);
            //    } else {
            //        //Returning success messages saying it was deleted
            //        console.log('DELETE removing ID: ' + blob._id);
            //        res.format({
            //            //HTML returns us back to the main page, or you can create a success page
            //            //html: function(){
            //            //    res.redirect("/blobs");
            //            //},
            //            //JSON returns the item with the message that is has been deleted
            //            json: function(){
            //                res.json({message : 'deleted',
            //                    item : blob
            //                });
            //            }
            //        });
            //    }
            //});
        }
    });
});


module.exports = router;