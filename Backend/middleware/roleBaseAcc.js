// middleware/authRole.js
const authRole = (role) => {
    return (req, res, next) => {
      if (req.user && req.user.role === role) {
        next(); // Allow access
      } else {
        res.status(403).json({ message: 'Access denied' });
      }
    };
  };
  
  module.exports = {authRole};
  