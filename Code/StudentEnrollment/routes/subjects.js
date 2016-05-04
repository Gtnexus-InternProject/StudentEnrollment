
/**
 * Created by hrajapaksha on 4/8/2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
    jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens //used to manipulate POST
    config = require('../config');

//This will make sure that every requests that hits this controller will pass through these functions
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



 // route middleware to verify a token
//  router.use(function(req, res, next) {

//    // check header or url parameters or post parameters for token
//    var token = req.body.token || req.query.token || req.headers['x-access-token'];

//    // decode token
//    if (token) {

//      // verifies secret and checks exp
//      jwt.verify(token, config.secret, function(err, decoded) {
//        if (err) {
//          return res.json({ success: false, message: 'Failed to authenticate token.' });
//        } else {
//          // if everything is good, save to request for use in other routes
//          req.decoded = decoded;
//          next();
//        }
//      });

//    } else {

//      // if there is no token
//      // return an error
//      return res.status(403).send({
//          success: false,
//          message: 'No token provided.'
//      });

//    }
//  });

router.route('/')

    //GET all blobs
    .get(function(req, res, next) {
        var errors = req.validationErrors();
        if (errors) {
            res.send('There have been validation errors: ' + errors, 400);
            return;
        }
        //retrieve all blobs from Monogo
        mongoose.model('subject_model').find({}, function (err, subjects) {
            if (err) {
                return console.error(err);
            } else {
                //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                res.format({
                    //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        res.render('subjects/index', {
                            title: 'All subjects',
                            "subjects" : subjects
                        });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(subjects);
                    }
                });
            }
        });
    })
    //POST a new blob
router.route('/subjectAdd').post(function(req, res) {
    var errors = req.validationErrors();
    if (errors) {
        res.send('There have been validation errors: ' + errors, 400);
        return;
    }
    //.post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var moduleCode = req.body.moduleCode;
        var moduleName = req.body.moduleName;
        var department=req.body.department;
        var coordinator = req.body.coordinator;
        var credits = req.body.credits;
        var semester = req.body.semester;
        var day = req.body.day;
        var description = req.body.description;
        var preRequestSubjects = req.body.preRequestSubjects;
        var status=1;




        //call the create function for our database
        mongoose.model('subject_model').create({

            moduleCode:moduleCode,
            moduleName:moduleName,
            department:department,
            coordinator:coordinator,
            credits:credits,
            semester:semester,
            day:day,
            description:description,
            preRequestSubjects:preRequestSubjects,
            status:status,

        }, function (err, subject) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                //Blob has been created
                console.log('POST creating new blob: ' + subject);
                res.format({
                    //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("subjects");
                        // And forward to success page
                        res.redirect("/subjects");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(subject);
                    }
                });
            }
        })
    });




// route middleware to validate :id
//router.param('id', function(req, res, next, id) {
//    //console.log('validating ' + id + ' exists');
//    //find the ID in the Database
//    mongoose.model('subject_model').findById(id, function (err, subject) {
//        //if it isn't found, we are going to repond with 404
//        if (err) {
//            console.log(id + ' was not found');
//            res.status(404)
//            var err = new Error('Not Found');
//            err.status = 404;
//            res.format({
//                html: function(){
//                    next(err);
//                },
//                json: function(){
//                    res.json({message : err.status  + ' ' + err});
//                }
//            });
//            //if it is found we continue on
//        } else {
//            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
//            //console.log(blob);
//            // once validation is done save the new item in the req
//            req.id = id;
//            // go to the next thing
//            next();
//        }
//    });
//});
//
//router.route('/:id')
//    .get(function(req, res) {
//        mongoose.model('subject_model').findById(req.id, function (err, blob) {
//            if (err) {
//                console.log('GET Error: There was a problem retrieving: ' + err);
//            } else {
//                console.log('GET Retrieving ID: ' + blob._id);
//                var blobdob = blob.userName.toISOString();
//                //blobdob = blobdob.substring(0, blobdob.indexOf('T'))
//                res.format({
//
//                    json: function(){
//                        res.json(blob);
//                    }
//                });
//            }
//        });
//    });


//GET the individual subject by Mongo ID
router.get('/:moduleCode', function(req, res) {
    var errors = req.validationErrors();
    if (errors) {
        res.send('There have been validation errors: ' + errors, 400);
        return;
    }
    //search for the blob within Mongo
    mongoose.model('subject_model').findOne({moduleCode:req.params.moduleCode}, function (err, subject) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //console.log('GET Retrieving ID: ' + subject.moduleCode);

            res.format({
                //JSON response will return the JSON output
                json: function(){
                    res.json(subject);
                }
            });
        }
    });
});


//PUT to update a blob by ID
router.put('/update/:ModuleCode', function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var errors = req.validationErrors();
    if (errors) {
        res.send('There have been validation errors: ' + errors, 400);
        return;
    }

    //find the document by ID
    mongoose.model('subject_model').findOne({moduleCode:req.params.moduleCode}, function (err, subject) {
        //update it
        if(err){
            console.log('Error in updating'+ err)
        }
        else{
        subject.update({
            moduleCode :  req.body.moduleCode,
            moduleName : req.body.moduleName,
            department : req.body.department,
            credits : req.body.credits,
            semester : req.body.semester,
            day : req.body.day,
            //description : req.body.description,
            preRequestSubjects : req.body.preRequestSubjects,
            //status:req.body.status,
        },{
            "upsert" : false
        }, function (err, blobID) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            }
            else {

                res.format({

                    //JSON responds showing the updated values
                    json: function(){
                        res.json(subject);
                    }
                });
            }
        })}
    });
});


//Delete subject



router.put('/delete/:moduleCode', function (req, res){  //find blob by ID

    mongoose.model('subject_model').findOne({moduleCode:req.params.moduleCode},{status:1}, function (err, deletesub) {
        if (err) {
            console.log('Error occur when deleting');
            return console.error(err);

        } else {
                    console.log('DELETE removing ID: ');
            deletesub.update({
                status:2
            },{
                "upsert" : false
            },function(err,updt){
                if(err){
                    console.log(('Error'+err))
                }
                else{
                    res.format({

                        json: function(){
                            res.json({message : 'deleted',
                                item : deletesub
                            });
                        }
                    });

                }

            })

                }


    });
});

// get students per particular subject

router.get('/student/:moduleCode',(function(req, res) {
        //if (req.type == "admin") {
        //    return res.status(404).send({
        //        success: false,
        //        message: 'Wrong URL'
        //    });
        //}

        mongoose.model('student').find({
            subjects : { $elemMatch :{moduleCode:req.params.moduleCode}}},{userName:1, firstName: 1,lastName: 1,email:1 }, function (err, resultUser) {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
            } else {
                console.log('GET Retrieving ID: ' + resultUser);
                res.format({
                    json: function(){
                        res.json(resultUser);
                    }
                });
            }
        });
    }));


module.exports = router;
