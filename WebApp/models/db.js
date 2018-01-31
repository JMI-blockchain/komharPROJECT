//Connecting to the mlab instance od the mongodb via ODM of mongoose
// grab the things we need
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


mongoose.connect('mongodb://admin:admin@ds219318.mlab.com:19318/notarization-db');


var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(passportLocalMongoose);
// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
