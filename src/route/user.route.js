const express = require("express");
const { getAllUsers, getUserById } = require("../controller/user.controller");

const router = express.Router();

router.route("").get(getAllUsers);
router.route("/:id").get(getUserById);

module.exports = router;
