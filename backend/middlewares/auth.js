const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    // payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};

module.exports = auth;

// const auth = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return next(new UnauthorizedError('Необходима авторизация'));
//   }
//   // const token = authorization.split('Bearer ', '');
//   const token = authorization.replace('Bearer ', '');
//   let payload;
//   try {
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     return next(new UnauthorizedError('Необходима авторизация'));
//   }
//   req.user = payload; // записываем пейлоуд в объект запроса
//   next(); // пропускаем запрос дальше
// };
