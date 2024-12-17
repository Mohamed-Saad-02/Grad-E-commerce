const express = require("express");
const {
  getCategories,
  getCategoryByID,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const subCategoryRoute = require("./subCategoryRoute");
const checkMongoId = require("../middlewares/checkMongoId");

const router = express.Router();

router.param("id", checkMongoId);
router.param("categoryId", checkMongoId);

router.use("/:categoryId/subcategories", subCategoryRoute);

router.route("/").get(getCategories).post(createCategory);

router
  .route("/:id")
  .get(getCategoryByID)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
