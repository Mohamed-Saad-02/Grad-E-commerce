const User = require("../models/userModal");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlersFactory");

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = factory.getAll(User);

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private/Admin
exports.getUser = factory.getOne(User);

// @desc    Create new user
// @route   POST /api/v1/users
// @access  Private/Admin
exports.createUser = factory.createOne(User);

// @desc    Update user by ID
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = factory.updateOne(User);

// @desc    Delete user by ID
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = factory.deleteOne(User);

// @desc    Get current user
// @route   GET /api/v1/users/me
// @access  Private
exports.getMe = catchAsync(async (req, res, next) => {
  // Get user that passed from protect middleware
  const { user } = req;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
