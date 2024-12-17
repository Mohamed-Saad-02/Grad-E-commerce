const validator = require("validator");
const AppError = require("../utils/appError");

module.exports = (req, res, next, id) =>
  validator.isMongoId(id) ? next() : next(new AppError("Wrong id", 400));
