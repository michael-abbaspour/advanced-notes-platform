/**
 * Routes for Categories.
 */

import { Router } from "express";
import { renderCategoriesPage, renderCreateCategoryPage, renderUpdateCategoryPage, renderDeleteCategoryPage, readAllCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";

const router = Router();

router.get("/dashboard/pages/categories", renderCategoriesPage);
router.get("/dashboard/pages/categories/create-category", renderCreateCategoryPage);
router.get("/dashboard/pages/categories/update-category/:id", renderUpdateCategoryPage);
router.get("/dashboard/pages/categories/delete-category/:id", renderDeleteCategoryPage);
router.get("/categories", readAllCategories);
router.post("/categories/create", createCategory);
router.post("/categories/update/:id", updateCategory);
router.post("/categories/delete/:id", deleteCategory);

export { router as categoryRoutes };