const factory = require("./handlersFactory");
const Category = require("../models/categoryModal");
const catchAsync = require("../utils/catchAsync");

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = catchAsync(async (req, res, next) => {
  const numCategories = await Category.countDocuments();
  const categories = await Category.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "category",
        as: "products",
      },
    },
    {
      $addFields: {
        productsCount: {
          $size: "$products",
        },
      },
    },
    {
      $project: {
        products: 0,
        __v: 0,
      },
    },
    {
      $limit: req.query.limit * 1 || 10,
    },
    {
      $sort: {
        productsCount: -1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    results: categories.length,
    total: numCategories,
    data: {
      categories,
    },
  });
});

// @desc    Get specific category by ID
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategoryByID = factory.getOne(Category);

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = factory.createOne(Category);

// @desc    Update specific category by ID
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.updateOne(Category);

// @desc    Delete specific category by ID
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = factory.deleteOne(Category);
