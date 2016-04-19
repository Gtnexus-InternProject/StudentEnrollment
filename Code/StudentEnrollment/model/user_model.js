var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var userSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  adddress: String,
  contactNumber: Number

});

var admin = userSchema.extend({

});

var student = userSchema.extend({
    dob: Date,
    gender: String,
    alStream: String,
    zScore: Number,
    Department: Number,
    registeredDate: Date,
    profileImage: String,
    subjects:[String]

});



mongoose.model('user_model', userSchema);
mongoose.model('admin_model',admin );
mongoose.model('student_model',student );
