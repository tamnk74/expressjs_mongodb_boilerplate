const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const findOrCreate = require('./plugins/findOrCreate');
const toJSON = require('./plugins/toJSON');

const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', function handlePassword(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcryptjs.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcryptjs.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.plugin(findOrCreate);
UserSchema.plugin(toJSON);

UserSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcryptjs.compareSync(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
User.INACTIVE = 1;

module.exports = User;
