const router = require('express').Router();
const EMAIL_REGEX = require('../utils/config');
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().regex(RegExp(EMAIL_REGEX)),
    password: Joi.string().required().min(4),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(RegExp(EMAIL_REGEX)),
    password: Joi.string().required().min(4),
  }),
}), login);
router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);
module.exports = router;
