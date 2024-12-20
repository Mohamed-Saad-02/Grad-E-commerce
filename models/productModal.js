const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
const validator = require("validator");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name required"],
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    description: {
      type: String,
      required: [true, "Product description required"],
      minlength: [20, "Too short product description"],
      maxlength: [2000, "Too long product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
      select: false,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      max: [200000, "Too long product price"],
    },
    discount: {
      discountType: {
        type: String,
        enum: ["fixed", "percentage"],
        default: "fixed",
      },
      discountPrice: {
        type: Number,
        default: 0,
        validate: {
          validator: function (value) {
            return value <= this.price;
          },
          message: "Discount price cannot be more than the product price",
        },
      },
    },
    images: {
      type: [String],
      required: [true, "Product images required"],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "Product images must have at least one",
      },
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      validate: {
        validator: (v) => validator.isMongoId(v.toString()),
        message: "Id Not Valid",
      },
    },
    subCategory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SubCategory",
        validate: {
          validator: (v) => validator.isMongoId(v.toString()),
          message: "Id Not Valid",
        },
      },
    ],
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      validate: {
        validator: (v) => validator.isMongoId(v.toString()),
        message: "Id Not Valid",
      },
    },
    status: {
      type: String,
      required: [true, "Product Status Is Required"],
      enum: {
        values: ["inStock", "outStock"],
        message: "Products Status Must Between Tow Value [inStock Or outStock]",
      },
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.isModified("name"))
    this.slug = slugify(this.name, { lower: true, trim: true });

  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name _id",
  })
    .populate({
      path: "brand",
      select: "name _id",
    })
    .populate({
      path: "subCategory",
      select: "name _id",
    });
  next();
});

module.exports = mongoose.model("Product", productSchema);
