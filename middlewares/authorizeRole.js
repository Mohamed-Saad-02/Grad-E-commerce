const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

/**
 * Middleware to authorize user roles
 *
 * @param  {...string} roles - Roles to authorize
 * @returns {Function} Middleware function for role-based authorization
 */

exports.authorizeRole = (...roles) =>
  catchAsync(async (req, res, next) => {
    // Get user that passed from protect middleware
    const { user } = req;

    // Flat the roles array if it is nested
    if (Array.isArray(roles)) roles = roles.flat();

    if (!roles.includes(user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  });