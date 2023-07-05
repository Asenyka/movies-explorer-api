const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const NotFoundError = require('../errors/not-found-error');

const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const OK = 200;

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(OK).send(user);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => res.status(OK).send({ user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))

    .then((user) => {
      res.status(OK).send({
        name: user.name, email: user.email, _id: user._id,
      });
    })
    .catch(next);
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            );
    res.send({ token });
    })
    .catch(next);
};
module.exports = {
  createUser,
  updateUser,
  login,
  getCurrentUser,
};
