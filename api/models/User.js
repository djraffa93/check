const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  subscription: {
    type: String,
    enum: ['base', 'advanced', 'premium'],
    default: 'base'
  },
  subscriptionActive: {
    type: Boolean,
    default: false
  },
  subscriptionExpires: {
    type: Date
  }
});

UserSchema.pre('save', function(next) {
  const user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if(err) return callback(err);

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);