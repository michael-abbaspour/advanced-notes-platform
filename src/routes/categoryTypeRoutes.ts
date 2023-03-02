/**
 * Routes for Category Types.
 */

import { Router } from "express";
import { renderCategoryTypesPage, renderCreateCategoryTypePage, renderUpdateCategoryTypePage, renderDeleteCategoryTypePage, readCategoryTypes, readCategoryTypesById, createCategoryType, updateCategoryType, deleteCategoryType } from "../controllers/categoryTypeController.js";

const router = Router();

router.get("/dashboard/pages/category-types", renderCategoryTypesPage);
router.get("/dashboard/pages/category-types/create-category-type", renderCreateCategoryTypePage);
router.get("/dashboard/pages/category-types/update-category-type/:id", renderUpdateCategoryTypePage);
router.get("/dashboard/pages/category-types/delete-category-type/:id", renderDeleteCategoryTypePage);
router.get("/category-types", readCategoryTypes);
router.get("/category-types/:id", readCategoryTypesById);
router.post("/category-types/create", createCategoryType);
router.post("/category-types/update/:id", updateCategoryType);
router.post("/category-types/delete/:id", deleteCategoryType);

export { router as categoryTypeRoutes };