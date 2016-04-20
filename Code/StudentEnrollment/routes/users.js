var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens //used to manipulate POST

var config = require('../config');

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


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {

  // find the user
    mongoose.model('student_model').findOne({
    userName: req.body.userName
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, config.secret, {
          expiresInMinutes: 1 // expires in 24 hours (in Mini)
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});


// // route middleware to verify a token
// router.use(function(req, res, next) {
//
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//   // decode token
//   if (token) {
//
//     // verifies secret and checks exp
//     jwt.verify(token, config.secret, function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//
//   } else {
//
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//         success: false,
//         message: 'No token provided.'
//     });
//
//   }
// });




// Student API Get all the student in GET and add new Student in POST
router.route('/student')
    //GET all blobs
    .get(function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('student_model').find({}, function (err, users) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        res.render('users/index', {
                              title: 'All Users',
                              "users" : users
                          });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(users);
                    }
                });
              }
        });
    })
    //POST a new blob
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var userId = req.body.userId;
        var userName = req.body.userName;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var password = req.body.password;
        var email = req.body.email;
        var adddress = req.body.adddress;
        var contactNumber = req.body.contactNumber;
        var dob = req.body.dob,
        gender = req.body.gender,
        alStream = req.body.alStream,
        zScore = req.body.zScore,
        Department = 1,
        registeredDate = req.body.registeredDate,
        profileImage = "testS",
        subjects = req.body.subjects.split(",");

          // profileImage = req.body.profileImage,


        //call the create function for our database
        mongoose.model('student_model').create({
            userId : userId,
            userName : userName,
            firstName : firstName,
            password : password,
            email : email,
            adddress : adddress,
            contactNumber : contactNumber,
            lastName : lastName,
            dob :  dob,
            gender : gender,
            alStream : alStream,
            zScore : zScore,
            Department : Department,
            registeredDate : registeredDate,
            profileImage : profileImage,
            subjects : subjects
        }, function (err, user) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Blob has been created
                  console.log('POST creating new blob: ' + user);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("users");
                        // And forward to success page
                        res.redirect("/users");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(user);
                    }
                });
              }
        })
    });

    /* GET New Student page. */
router.get('/student/new', function(req, res) {
    res.render('users/new', { title: 'Add New User' });
});


// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('student_model').findOne({userId: id}, function (err, user) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {

          console.log(user.userId + ' was  found');
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(blob);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

router.route('/studenttk/:id')
  .get(function(req, res) {
    mongoose.model('student_model').findOne({userId:req.params.id}, function (err, student) {
      console.log('ID: ' + req.params.id);
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + student.userId);
        //var blobdob = student.userName.toISOString();
        //blobdob = blobdob.substring(0, blobdob.indexOf('T'))
        res.format({
          html: function(){
              res.render('users/show', {

                "Student" : student
              });
          },
          json: function(){
              res.json(student);
          }
        });
      }
    });
  });


  //GET the individual blob by Mongo ID
router.get('/:id/edit', function(req, res) {
    //search for the blob within Mongo
    mongoose.model('admin').findById(req.body.userId, function (err, admin) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //Return the blob
            console.log('GET Retrieving ID: ' + admin.userId);
            //format the date properly for the value to show correctly in our edit form
          var blobdob = admin.userName.toISOString();
          // blobdob = blobdob.substring(0, blobdob.indexOf('T'))
            res.format({
                //HTML response will render the 'edit.jade' template
                html: function(){
                       res.render('blobs/edit', {
                          title: 'Blob' + admin.userId,
                        "blobdob" : blobdob,
                          "blob" : admin
                      });
                 },
                 //JSON response will return the JSON output
                json: function(){
                       res.json(admin);
                 }
            });
        }
    });
});


//PUT to update a blob by ID
router.put('/:id/edit', function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var userId = req.body.userId;
    var userName = req.body.userName;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var password = req.body.password;
    var email = req.body.email;
    var adddress = req.body.adddress;
    var contactNumber = req.body.contactNumber;
    var userLevel = req.body.userLevel;

   //find the document by ID
        mongoose.model('admin').findById(req.id, function (err, admin) {
            //update it
            admin.update({
              userId : userId,
              userName : userName,
              firstName : firstName,
              password : password,
              email : email,
              adddress : adddress,
              contactNumber : contactNumber,
              userLevel : userLevel,
              lastName : lastName
            }, function (err, blobID) {
              if (err) {
                  res.send("There was a problem updating the information to the database: " + err);
              }
              else {
                      //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                      res.format({
                          html: function(){
                               res.redirect("/blobs/" + admin.userId);
                         },
                         //JSON responds showing the updated values
                        json: function(){
                               res.json(admin);
                         }
                      });
               }
            })
        });
});


//DELETE a Blob by ID
router.delete('/:id/edit', function (req, res){
    //find blob by ID
    mongoose.model('Blob').findById(req.id, function (err, admin) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            blob.remove(function (err, admin) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETE removing ID: ' + admin.userId);
                    res.format({
                        //HTML returns us back to the main page, or you can create a success page
                          html: function(){
                               res.redirect("/admins");
                         },
                         //JSON returns the item with the message that is has been deleted
                        json: function(){
                               res.json({message : 'deleted',
                                   item : admin
                               });
                         }
                      });
                }
            });
        }
    });
});


module.exports = router;
