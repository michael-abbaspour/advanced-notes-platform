/**
 * Route(s) for the Index.
 */

import { Router } from "express";
import { renderIndexPage } from "../controllers/indexController.js";

const router = Router();

router.get("/", renderIndexPage);

export { router as indexRoutes };