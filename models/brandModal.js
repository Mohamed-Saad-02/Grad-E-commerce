const mongoose = require("mongoose");

const { default: slugify } = require("slugify");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Too short brand name"],
      maxlength: [32, "Too long brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

brandSchema.pre("save", function (next) {
  if (this.isModified("name"))
    this.slug = slugify(this.name, { lower: true, trim: true });
  next();
});

const BrandModal = mongoose.model("Brand", brandSchema);

module.exports = BrandModal;
