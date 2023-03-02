/**
 * Routes for Auth.
 */

import { Router } from "express";
import { renderRegisterPage, renderLogin, registerAdminHandler, loginHandler, logoutHandler } from "../controllers/authController.js";

const router = Router();

router.get("/register", renderRegisterPage);
router.get("/login", renderLogin);
router.get("/logout", logoutHandler);
router.post("/register", registerAdminHandler);
router.post("/login", loginHandler);

export { router as authRoutes };