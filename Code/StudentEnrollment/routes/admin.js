var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//This will make sure that every requests that hits this controller will pass through these functions
router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
}));


router.route('/')
    //GET all blobs
    .get(function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('admin').find({}, function (err, blobs) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        res.render('admins/index', {
                              title: 'All my admins',
                              "admins" : admins
                          });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(infophotos);
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
        var userLevel = req.body.userLevel;

        //call the create function for our database
        mongoose.model('admin').create({
            userId : userId,
            userName : userName,
            firstName : firstName,
            password : password,
            email : email,
            adddress : adddress,
            contactNumber : contactNumber,
            userLevel : userLevel,
            lastName : lastName
        }, function (err, admin) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Blob has been created
                  console.log('POST creating new blob: ' + admin);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("admins");
                        // And forward to success page
                        res.redirect("/admins");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(admin);
                    }
                });
              }
        })
    });
