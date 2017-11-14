const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: {
        validator: validator.isEmail;
        message: '{VALUE} is not a valid email'
      }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required:true
    }
  }]
});


// override defaults to not return 'all' info
// when mongoose model is converted to JSON
UserSchema.methods.toJSON = function () => {
  var user = this;
  var userObject = user.toObject();

  // only return 'some' items in response body
  return _.pick(userObject, ['_id', 'email']);
};

// need a 'this' keyboard so we need a non-arrow function
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();
  user.tokens.push({access,token});
  return user.save().then(() => {
    return token;
  });
};

// create model method
UserSchema.statics.findByToken = function (token) {
  var User = this;    // model variable
  var decoded;        // undefined for now
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  // success of try/catch
  return User.findOne(() => {
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

};

var User = mongoose.model('User', UserSchema);

module.exports = {User};
