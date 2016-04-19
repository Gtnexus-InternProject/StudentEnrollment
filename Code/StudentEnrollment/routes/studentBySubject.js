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

router.route('/:id')
    .get(function(req, res) {
        mongoose.model('user_model').find({subjects:123},{userId:1, firstName: 1,lastName: 1,email:1 }, function (err, resultUser) {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
            } else {
                console.log('GET Retrieving ID: ' + resultUser._id);
                //var blobdob = resultUser.userName.toISOString();
                //blobdob = blobdob.substring(0, blobdob.indexOf('T'))
                res.format({
                    //html: function(){
                    //    res.render('subjects/showSBS', {
                    //        "blobdob" : blobdob,
                    //        "resultUser" : resultUser
                    //    });
                    //},
                    json: function(){
                        res.json(resultUser);
                    }
                });
            }
        });
    });
module.exports = router;