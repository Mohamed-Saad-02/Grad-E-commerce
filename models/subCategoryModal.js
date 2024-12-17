const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
const validator = require("validator");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [2, "To short SubCategory name"],
      maxlength: [32, "To long SubCategory name"],
      required: [true, "SubCategory required"],
    },
    slug: {
      type: String,
      lowercase: true,
      select: false,
    },
    category: {
      // type: mongoose.Schema.ObjectId, // Old
      type: mongoose.Types.ObjectId, // New
      ref: "Category",
      validate: {
        validator: (v) => validator.isMongoId(v.toString()),
        message: "Id Not Valid",
      },
    },
  },
  { timestamps: true }
);

// Make a name at subCategory unique for each category
subCategorySchema.index({ name: 1, category: 1 }, { unique: true });

subCategorySchema.pre("save", function (next) {
  if (this.isModified("name"))
    this.slug = slugify(this.name, {
      lower: true,
      trim: true,
    });

  next();
});

subCategorySchema.pre(/^find/, function (next) {
  this.populate({ path: "category", select: "name" });
  next();
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
