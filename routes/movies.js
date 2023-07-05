const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const URL_REGEX = require('../utils/config');

const {
  deleteMovie, getMovies, createMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
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
  }),
}), createMovie);
router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
