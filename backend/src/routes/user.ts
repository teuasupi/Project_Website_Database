import { Router } from "express";
import UserController from "../controllers/user";

const router: Router = Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

router.get("/", UserController.getAllUsers);
router.post("/", UserController.updateUser);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.patch("/:id/profile-photo", UserController.uploadProfilePhoto);
router.delete("/:id", UserController.deleteUser);

export default router;