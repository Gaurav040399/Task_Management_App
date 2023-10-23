
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    // console.log(decoded)
    req.userID = decoded.userID
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = {authenticateUser};
