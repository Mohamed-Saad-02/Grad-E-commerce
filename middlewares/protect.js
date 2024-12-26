const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("../models/userModal");

const protect = async (req, res, next) => {
  let token;

  // Check if token exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError("invalid token", 401));

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Check if user still exists
  const newUser = await User.findById(decoded.id);

  if (!newUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }

  // Check if user changed password after the token was issued

  if (newUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again", 401)
    );
  }

  req.user = newUser;
  next();
};

module.exports = protect;
