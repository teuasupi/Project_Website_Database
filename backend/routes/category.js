const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");
const { authenticate } = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorization");

router.get("/tree", CategoryController.getCategoryTree);
router.get("/slug/:slug", CategoryController.getCategoryBySlug);
router.get("/:id", CategoryController.getCategoryById);
router.get("/:id/breadcrumb", CategoryController.getCategoryBreadcrumb);

router.use(authenticate);

router.post("/", CategoryController.createCategory);

router.use(authorize("admin"));

router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
