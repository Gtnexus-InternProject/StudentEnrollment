var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var adminSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  adddress: String,
  contactNumber: Number,
  userLevel: Number,
});
mongoose.model('user_model', adminSchema);
