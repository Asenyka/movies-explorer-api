require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-error');
const { DB_ADDRESS } = require('./utils/config');
const limiter = require('./utils/rateLimiter');
const errorHandling = require('./errors/errorHandling');
const { errMessagePageNotFound } = require('./utils/constants');

mongoose.connect(DB_ADDRESS);
const app = express();
app.use(requestLogger);
app.use(errorLogger);
app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/', router);
app.use((req, res, next) => { next(new NotFoundError(errMessagePageNotFound)); });
app.use(errors());
app.use(errorHandling);
app.listen(3000, () => {
});
