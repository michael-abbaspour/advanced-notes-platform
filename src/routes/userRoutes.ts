/**
 * Routes for Users.
 */

import { Router } from "express";
import { renderDashboard, readAllUsers, readUserById, createUser } from "../controllers/userController.js";

const router = Router();

router.get("/dashboard", renderDashboard);
router.get("/users", readAllUsers);
router.get("/users/:id", readUserById);
router.post("/users", createUser);

export { router as userRoutes };