/**
 * Controller(s) used for Notes.
 */

import { NextFunction, Request, Response } from "express";
import { AddNote, GetAllNotes, GetNoteId, UpdateNote, DeleteNote } from "../models/noteModel.js";
import { GetCategories } from "../models/categoryModel.js";
import { GetTags } from "../models/tagModel.js";
import { generateNoteUniqueId } from "../utilities/generator.js";

export const renderNotesPage = async function(request: Request, response: Response) {
	const newGetAllNotes = new GetAllNotes();
	const result = await newGetAllNotes.readAllForeignTableJoin();

	response.status(200).render("dashboard/pages/notes", {
		notes: result
	});
};

export const renderSingleNotePage = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const noteId = request.params.id;
		const newNoteById = new GetNoteId(noteId);
		const readNoteByIdJoin = await newNoteById.readByIdForeignTableJoin();

		response.render("dashboard/pages/notes/note", {
			noteIdParam: noteId,
			userId: readNoteByIdJoin.user_id,
			categoryName: readNoteByIdJoin.category_name,
			tagName: readNoteByIdJoin.tag_name,
			noteTitle: readNoteByIdJoin.note_title,
			noteBody: readNoteByIdJoin.note_body,
			lastEdited: readNoteByIdJoin.last_edited
		});
	} catch(err) {
		next(err);
	}
};

export const renderCreateNotePage = async function(request: Request, response: Response) {
	const newCategories = new GetCategories();
	const getCategoryOptions = await newCategories.readIdAndName();
	const newTags = new GetTags();
	const getTagOptions = await newTags.readIdAndName();

	response.render("dashboard/pages/notes/create-note", {
		categories: getCategoryOptions,
		tags: getTagOptions
	});
};

export const renderUpdateNotePage = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const noteId = request.params.id;
		const newGetNoteById = new GetNoteId(noteId);
		const readNoteById = await newGetNoteById.readById();

		const newGetCategories = new GetCategories();
		const readCategoryOptions = await newGetCategories.readIdAndName();
		const newGetTags = new GetTags();
		const readTagOptions = await newGetTags.readIdAndName();

		response.render("dashboard/pages/notes/update-note", {
			noteIdParam: noteId,
			categoryId: readNoteById.category_id,
			tagId: readNoteById.tag_id,
			noteTitle: readNoteById.note_title,
			noteBody: readNoteById.note_body,
			categories: readCategoryOptions,
			tags: readTagOptions
		});
	} catch(err) {
		next(err);
	}
};

export const renderDeleteNotePage = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const noteId = request.params.id;
		const newGetNoteById = new GetNoteId(noteId);
		const readNoteById = await newGetNoteById.readById();

		response.render("dashboard/pages/notes/delete-note", {
			noteIdParam: noteId,
			noteTitle: readNoteById.note_title
		});
	} catch(err) {
		next(err);
	}
};

export const readNoteId = async function(request: Request, response: Response) {
	const noteId = request.params.id;

	const newNoteId = new GetNoteId(noteId);
	const result = await newNoteId.readById();

	response.status(200).json(result);
};

export const createNote = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const { category_id, tag_id, note_title, note_body } = request.body;
		const dateCreated = new Date();
		const dateLastEdited = new Date();
		const noteUniqueId = generateNoteUniqueId();
		const userId = request.session.user;

		if (userId != null) {
			const newNote = new AddNote(userId.id, dateCreated, category_id, tag_id, note_title, note_body, dateLastEdited, noteUniqueId);
			const addNewNote = await newNote.createNewNote();
			const newGetAllNotes = new GetAllNotes();
			const readAllNotesJoin = await newGetAllNotes.readAllForeignTableJoin();

			response.status(201).render("dashboard/pages/notes", {
				addNewNote,
				notes: readAllNotesJoin
			});
		}
	} catch(err) {
		next(err);
	}
};

export const updateNote = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const { category_id, tag_id, note_title, note_body } = request.body;
		const noteId = request.params.id;
		const newUpdateNote = new UpdateNote(noteId, category_id, tag_id, note_title, note_body);
		const result = await newUpdateNote.update();

		const newGetAllNotes = new GetAllNotes();
		const readAllNotesJoin = await newGetAllNotes.readAllForeignTableJoin();

		response.status(200).render("dashboard/pages/notes", {
			result,
			notes: readAllNotesJoin
		});
	} catch(err) {
		next(err);
	}
};

export const deleteNote = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const noteId = request.params.id;
		const newDeleteNote = new DeleteNote(noteId);
		const result = await newDeleteNote.delete();

		const newGetAllNotes = new GetAllNotes();
		const readAllNotesJoin = await newGetAllNotes.readAllForeignTableJoin();

		response.status(200).render("dashboard/pages/notes", {
			result,
			notes: readAllNotesJoin
		});
	} catch(err) {
		next(err);
	}
};