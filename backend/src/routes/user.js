const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

router.get("/", UserController.getAllUsers);
router.post("/", UserController.updateUser);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.patch("/:id/profile-photo", UserController.uploadProfilePhoto);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
