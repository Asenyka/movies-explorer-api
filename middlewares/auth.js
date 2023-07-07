const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/auth-error');
const {errMessageAuthRequired} = require('../utils/constants');

const extractBearerToken = (header) => header.replace('Bearer ', '');
const { NODE_ENV, JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AuthorizationError(errMessageAuthRequired));
  }
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthorizationError(errMessageAuthRequired));
  }
  req.user = payload;
  return next();
};
