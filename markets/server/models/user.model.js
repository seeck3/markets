const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {
  Schema
} = mongoose;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'Please, enter your First name']
  },
  last_name: {
    type: String,
    required: [true, 'Please, enter your Last name']
  },
  email: {
    type: String,
    required: [true, 'Please, enter your Email'],
    trim: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      }
    }
  },
  password: {
    type: String,
    required: [true, 'Please, enter your password']
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true,
});

UserSchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique'
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 10)
    .then(hasedPassword => {
      this.password = hasedPassword;

      next();
    })
    .catch(next);
});

UserSchema.statics.validatePassword = function (candidatePassword, hasedPassword) {
  return bcrypt.compare(candidatePassword, hasedPassword);
};

module.exports = mongoose.model('User', UserSchema);
