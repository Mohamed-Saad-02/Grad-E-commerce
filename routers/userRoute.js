const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getMe,
} = require("../controllers/userController");

const checkMongoId = require("../middlewares/checkMongoId");
const { authorizeRole } = require("../middlewares/authorizeRole");
const protect = require("../middlewares/protect");

const router = express.Router();

router.param("id", checkMongoId);

router
  .route("/")
  .get(protect, authorizeRole("admin"), getUsers)
  .post(protect, authorizeRole("admin"), createUser);

router.route("/me").get(protect, getMe); // Get current user

router.route("/:id").get(protect, authorizeRole("admin"), getUser);
// .put(authorizeRole("admin", "user"), updateUser)
// .delete(deleteUser);

module.exports = router;
