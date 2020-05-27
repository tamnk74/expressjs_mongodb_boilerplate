const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

UserSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcryptjs.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcryptjs.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcryptjs.compareSync(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
