/**
 * Routes for Notes.
 */

import { Router } from "express";
import { renderNotesPage, renderSingleNotePage, renderCreateNotePage, renderUpdateNotePage, renderDeleteNotePage, readNoteId, createNote, updateNote, deleteNote } from "../controllers/noteController.js";

const router = Router();

router.get("/dashboard/pages/notes", renderNotesPage);
router.get("/dashboard/pages/notes/note/:id", renderSingleNotePage);
router.get("/dashboard/pages/notes/create-note", renderCreateNotePage);
router.get("/dashboard/pages/notes/update-note/:id", renderUpdateNotePage);
router.get("/dashboard/pages/notes/delete-note/:id", renderDeleteNotePage);
router.get("/notes/:id", readNoteId);
router.post("/notes/create", createNote);
router.post("/notes/update/:id", updateNote);
router.post("/notes/delete/:id", deleteNote);

export { router as noteRoutes };