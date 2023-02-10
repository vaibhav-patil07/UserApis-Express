const express = require("express");
const {
  getAllUsers,
  getUserById,
  validateUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controller/user.controller");

const router = express.Router();

router.route("").get(getAllUsers).post(validateUser, createUser);

router
  .route("/:id")
  .get(getUserById)
  .delete(deleteUser)
  .put(validateUser, updateUser);

module.exports = router;
