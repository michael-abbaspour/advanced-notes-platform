/**
 * Routes for Tags.
 */

import { Router } from "express";
import { renderTagsPage, renderCreateTagPage, renderUpdateTagPage, renderDeleteTagPage, readAllTags, readTagId, createTag, updateTag, deleteTag } from "../controllers/tagController.js";

const router = Router();

router.get("/dashboard/pages/tags", renderTagsPage);
router.get("/dashboard/pages/tags/create-tag", renderCreateTagPage);
router.get("/dashboard/pages/tags/update-tag/:id", renderUpdateTagPage);
router.get("/dashboard/pages/tags/delete-tag/:id", renderDeleteTagPage);
router.get("/tags", readAllTags);
router.get("/tags/:id", readTagId);
router.post("/tags/create", createTag);
router.post("/tags/update/:id", updateTag);
router.post("/tags/delete/:id", deleteTag);

export { router as tagRoutes };