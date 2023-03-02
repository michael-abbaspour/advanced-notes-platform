/**
 * The main index file.
 */

import envProps from "./config/environment.js";
import express, { Application } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { corsConfiguration } from "./utilities/cors.js";
import { sessionOptions } from "./utilities/db.js";
import { indexRoutes } from "./routes/indexRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { requireUser } from "./middleware/requireUser.js";
import { userRoutes } from "./routes/userRoutes.js";
import { categoryRoutes } from "./routes/categoryRoutes.js";
import { categoryTypeRoutes } from "./routes/categoryTypeRoutes.js";
import { tagRoutes } from "./routes/tagRoutes.js";
import { noteRoutes } from "./routes/noteRoutes.js";

const app: Application = express();
const port = envProps.SERVER_PORT || 7002;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(corsConfiguration);
app.use(sessionOptions);

/**
 * Provides relative path(s) and file locations for the application's static content.
 */
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/images")));
app.use(express.static(path.join(__dirname, "../dist/public/js")));

/**
 * All the application's routes and correctly placed custom middleware.
 */
app.use(indexRoutes);
app.use(authRoutes);
// Middleware which requires the user to be logged in.
app.use(requireUser);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(categoryTypeRoutes);
app.use(tagRoutes);
app.use(noteRoutes);

app.listen(port, function () {
	console.log(`Server is listening on http://localhost:${port}`);
});