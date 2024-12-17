const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getTopSale,
} = require("../controllers/productController");
const checkMongoId = require("../middlewares/checkMongoId");

const router = express.Router();

router.get("/top-sale", getTopSale);

router.param("id", checkMongoId);

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
