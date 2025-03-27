import jwt from 'jsonwebtoken';

/**
 * Authentication for logged in users
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default function authorization(req, res, next) {
  const token = req.headers.token;

  console.log(token);

  if (!token) {
    res.json({
      'success': false,
      'message': 'Unauthenticated user bruhhh',
    });
    return;
  }

  jwt.verify(token, process.env.API_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.json({
        'success': false,
        'message': 'Invalid token',
      });
      return;
    }

    res.locals.username = decoded?.username;
    res.locals.authenticated = true;
    next();
  });
}