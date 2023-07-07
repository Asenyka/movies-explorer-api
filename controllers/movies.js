const movieModel = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { errMessageMovieNotFound, errMessageMovieDeleteForbidden } = require('../utils/constants');

const OK = 200;

const getMovies = (req, res, next) => {
  movieModel.find({})
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const movie = req.body;
  movie.owner = req.user._id;
  movieModel.create(movie)
    .then((newMovie) => {
      res.status(OK).send(newMovie);
    })
    .catch(next);
};
const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const movieId = req.params._id;
  movieModel.findById(movieId)
    .then((movie) => {
      if (movie === null) {
        return next(new NotFoundError(errMessageMovieNotFound));
      }
      if (!movie.owner.equals(userId)) {
        return next(new ForbiddenError(errMessageMovieDeleteForbidden));
      }
      return movieModel.findByIdAndRemove(movieId)
        .then(() => {
          getMovies(req, res);
        });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
