import { authenticate } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorization";

const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);
router.get("/verify/:token", UserController.verifyAccount);

router.get("/profile", UserController.getUser);

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUser);

router.use(authenticate);

router.put("/:id", UserController.editUser);

router.use(authorize("admin"));

router.delete("/:id", UserController.deleteUser);
router.put("/activate/:id", UserController.activateAccount);

export default router;
