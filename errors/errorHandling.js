const { errMessageEmailConflict, errMessageServerError } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (err.code === 11000) {
    res.status(409).send({ message: errMessageEmailConflict });
  }
  if (!err.statusCode) {
    res.status(500).send({ message: errMessageServerError });
  }
  res.status(err.statusCode).send({ message: err.message });

  next();
};
