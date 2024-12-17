const express = require("express");

const {
  getBrands,
  createBrand,
  getBrandByID,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");
const checkMongoId = require("../middlewares/checkMongoId");

const router = express.Router();

router.param("id", checkMongoId);

router.route("/").get(getBrands).post(createBrand);

router.route("/:id").get(getBrandByID).put(updateBrand).delete(deleteBrand);

module.exports = router;
