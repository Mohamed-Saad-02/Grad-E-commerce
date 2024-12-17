const factory = require("./handlersFactory");

const Product = require("../models/productModal");
const catchAsync = require("../utils/catchAsync");

// @desc    Get list of top sale products
// @route   GET /api/v1/products/top-sale
// @access  Public
exports.getTopSale = catchAsync(async (req, res, next) => {
  const { limit } = req.query;

  const products = await Product.aggregate([
    { $sort: { sale: -1 } },
    { $limit: limit || 20 },
  ]);

  res.status(200).json({ status: "success", data: products });
});

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = factory.getAll(Product);

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = factory.getOne(Product);

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
exports.createProduct = factory.createOne(Product);
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = factory.updateOne(Product);

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = factory.deleteOne(Product);
