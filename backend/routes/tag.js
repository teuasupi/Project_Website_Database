const express = require("express");
const TagController = require("../controllers/tagController");
const { authenticate } = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorization");
const router = express.Router();

router.get("/", TagController.getAllTags);
router.get("/popular", TagController.getPopularTags);
router.get("/id/:id", TagController.getTagById);
router.get("/slug/:slug", TagController.getTagBySlug);
router.get("/id/:id/content", TagController.getTagWithContent);

router.use(authenticate);

router.post("/", authenticate, TagController.createTag);

router.use(authorize("admin"));

router.put("/:id", authenticate, TagController.updateTag);
router.delete("/:id", authenticate, TagController.deleteTag);

module.exports = router;
