require('dotenv').config();
// eslint-disable-next-line import/no-unresolved
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const routes = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { loginValidation, createUserValidation } = require('./middlewares/validation');
const NotFoundError = require('./errors/notFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger); // подключаем логгер запросов

// подключаемся к серверу mongo
mongoose.connect(
  DB_ADDRESS,
  { useNewUrlParser: true },
);

// mongoose.connect(
//   DB_ADDRESS,
// )
//   .then(() => console.log('Монго запущено'))
//   // eslint-disable-next-line no-undef
//   .catch((err) => console.log(err));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

// авторизация
app.use(auth);
app.use(routes);

app.use('/*', (req, res, next) => { next(new NotFoundError('Страница не существует')); });

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

// app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is working');
});
