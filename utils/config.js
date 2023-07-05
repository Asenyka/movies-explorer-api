const {NODE_ENV, JWT_SECRET} = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const URL_REGEX = /https?:\/\/(www\.)?[-a-z0-9-._~:/?#@!$&'()*+,;=_]#?/;
const EMAIL_REGEX = /^[a-z-Z0-9._%+-]+@[a-z-Z0-9-]+.+.[a-z]{2,4}$/i;

module.exports = { NODE_ENV, JWT_SECRET, DB_ADDRESS, URL_REGEX, EMAIL_REGEX };
