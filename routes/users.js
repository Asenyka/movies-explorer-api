const router = require('express').Router();
const EMAIL_REGEX = require('../utils/config');
const { celebrate, Joi } = require('celebrate');

const {
  updateUser, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(RegExp(EMAIL_REGEX)),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

module.exports = router;
