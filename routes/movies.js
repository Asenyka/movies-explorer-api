const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

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
    image: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-z0-9-._~:/?#@!$&'()*+,;=_]#?/),
    trailerLink: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-z0-9-._~:/?#@!$&'()*+,;=_]#?/),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-z0-9-._~:/?#@!$&'()*+,;=_]#?/),
    movieId: Joi.number().required(),
  }),
}), createMovie);
router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
