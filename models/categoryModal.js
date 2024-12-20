const mongoose = require("mongoose");

const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  if (this.isModified("name"))
    this.slug = slugify(this.name, { lower: true, trim: true });
  next();
});

const categoryModal = mongoose.model("Category", categorySchema);

module.exports = categoryModal;
