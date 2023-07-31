const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.REACT_APP_SECRET_KEY;  // This should be in an environment variable in a real application

const authenticateJwt = (req, res, next) => {
  let token = req.headers.auth;
  token = token.split(" ")[1];
  jwt.verify(token, secretKey, (error, data) => {
    if (error) {
      res.status(403).json({ message: "wrong input" });
    } else {
      req.user = data;
      next();
    }
  });
};

const generatejwt = (req) => {
  const { username, password, role } = req.body;
  const obj = {
    username: username,
    password: password,
    role: role,
  };
  const token = jwt.sign(obj, secretKey, { expiresIn: "1h" });
  return token;
};

module.exports = {
    authenticateJwt,
    secretKey,
    generatejwt
}
