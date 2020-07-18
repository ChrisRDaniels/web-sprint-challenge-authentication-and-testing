/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || 'keepitsecretkeepitsafe';

  if (token) {
    jwt.verify(token, secret, (err, decodedtoken) => {
      if (err) {
        res.status(401).json(err);
      } else {
        req.decodedJwt = decodedtoken;
        next();
      }
    });
  } else {
    res.status(400).json({ Error: 'Invalid credentials provided.' });
  }
};
