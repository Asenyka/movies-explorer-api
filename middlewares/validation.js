const { celebrate, Joi } = require('celebrate');
const { EMAIL_REGEX, URL_REGEX } = require('../utils/config');

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(RegExp(URL_REGEX)),
    trailerLink: Joi.string().required().regex(RegExp(URL_REGEX)),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(RegExp(URL_REGEX)),
    movieId: Joi.number().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().regex(RegExp(EMAIL_REGEX)),
    password: Joi.string().required().min(4),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(RegExp(EMAIL_REGEX)),
    password: Joi.string().required().min(4),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().regex(RegExp(EMAIL_REGEX)),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports = {
  validateCreateMovie,
  validateDeleteMovie,
  validateSignin,
  validateSignup,
  validateUpdateUser,
};
