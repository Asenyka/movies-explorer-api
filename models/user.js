const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthorizationError = require('../errors/auth-error');
const { errMessageEmailInvalid, errMessageAuthError } = require('../utils/constants');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: errMessageEmailInvalid,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function fname(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(() => {
      throw new AuthorizationError(errMessageAuthError);
    })
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new AuthorizationError(errMessageAuthError);
        }
        return user;
      }));
};
module.exports = mongoose.model('user', userSchema);
