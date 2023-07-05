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

mongoose.connect(DB_ADDRESS);
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use((req, res, next) => { next(new NotFoundError('Запрашиваемая страница не найдена')); });
app.use(errors());
app.use((err, req, res, next) => {
  if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с указанным email уже зарегистрирован' });
  }
  if (!err.statusCode) {
    res.status(500).send({ message: 'Ошибка сервера' });
  }
  res.status(err.statusCode).send({ message: err.message });

  next();
});
app.listen(3000, () => {
});
