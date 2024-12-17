const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  createFilterObj,
} = require("../controllers/subCategoryController");
const checkMongoId = require("../middlewares/checkMongoId");

const router = express.Router({ mergeParams: true });

router.param("id", checkMongoId);

router
  .route("/")
  .post(createSubCategory)
  .get(createFilterObj, getSubCategories);

router
  .route("/:id")
  .get(getSubCategory)
  .put(updateSubCategory)
  .delete(deleteSubCategory);

module.exports = router;
