import ProfileController from "../controllers/profileController";
import { authenticate } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorization";

const express = require("express");
const router = express.Router();

router.get("/", ProfileController.getAllProfiles);
router.get("/:userId", ProfileController.getProfileByUserId);
router.post("/:id", ProfileController.getProfileById);
router.get("/search", ProfileController.searchProfiles);

router.use(authenticate);

router.put("/:id", ProfileController.updateProfile);

router.use(authorize("admin"));

router.post("/", ProfileController.createProfile);
router.delete("/:id", ProfileController.deleteProfile);

export default router;
