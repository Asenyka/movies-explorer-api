const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUser, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/^[a-z-Z0-9._%+-]+@[a-z-Z0-9-]+.+.[a-z]{2,4}$/i),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

module.exports = router;
