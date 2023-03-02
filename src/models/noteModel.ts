/**
 * Model(s) used for Notes.
 */

import { dbQuery } from "../utilities/db.js";
import { Note, NoteId, NoteIdAndTitle, NoteForeignKeyJoin } from "../interfaces/api/notes.js";

export class GetAllNotes {
	async readAll() {
		const sql = "SELECT * FROM notes";
		return await dbQuery<Note>(sql);
	}
	async readAllForeignTableJoin() {
		const sql = "SELECT note.id, note.user_id, c.category_name, tag.tag_name, note.note_title, note.note_body, note.last_edited FROM notes note LEFT JOIN categories c ON note.category_id = c.id LEFT JOIN tags tag ON note.tag_id = tag.id";
		return await dbQuery<NoteForeignKeyJoin>(sql);
	}
}

export class GetNoteId implements NoteId {
	constructor(readonly id: string | number) {
		this.id = id;
	}
	async readById() {
		const sql = "SELECT user_id, date_created, category_id, tag_id, note_title, note_body, last_edited, unique_id FROM notes WHERE id = ?";
		const rows = await dbQuery<Note>(sql, [
			this.id
		]);
		return rows[0];
	}
	async readByIdForeignTableJoin() {
		const sql = "SELECT note.id, note.user_id, c.category_name, tag.tag_name, note.note_title, note.note_body, note.last_edited FROM notes note LEFT JOIN categories c ON note.category_id = c.id LEFT JOIN tags tag ON note.tag_id = tag.id WHERE note.id = ?";
		const rows = await dbQuery<NoteForeignKeyJoin>(sql, [
			this.id
		]);
		return rows[0];
	}
}

export class AddNote implements Note {
	constructor(
		readonly user_id: string | number,
		readonly date_created: Date,
		public category_id: string | number = 1,
		public tag_id: string | number = "",
		public note_title: string,
		public note_body: string,
		readonly last_edited: Date,
		readonly unique_id: string,

	) {
		this.user_id = user_id;
		this.date_created = date_created;
		this.category_id = category_id;
		this.tag_id = tag_id;
		this.note_title = note_title;
		this.note_body = note_body;
		this.last_edited = last_edited;
		this.unique_id = unique_id;
	}
	async createNewNote() {
		const sql = "INSERT INTO notes (user_id, date_created, category_id, tag_id, note_title, note_body, last_edited, unique_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
		const rows = await dbQuery<Note>(sql, [
			this.user_id, this.date_created, this.category_id, this.tag_id, this.note_title, this.note_body, this.last_edited, this.unique_id
		]);
		return rows[0];
	}
}

export class UpdateNote {
	readonly last_edited: Date;
	constructor(
		readonly id: string | number,
		public category_id: string | number,
		public tag_id: string | number,
		public note_title: string,
		public note_body: string
	) {
		this.id = id;
		this.category_id = category_id;
		this.tag_id = tag_id;
		this.note_title = note_title;
		this.note_body = note_body;
		this.last_edited = new Date();
	}
	async update() {
		const sql = "UPDATE notes SET category_id = ?, tag_id = ?, note_title = ?, note_body = ?, last_edited = ? WHERE id = ?";
		const rows = await dbQuery<Note>(sql, [
			this.category_id, this.tag_id, this.note_title, this.note_body, this.last_edited, this.id
		]);
		return rows[0];
	}
}

export class DeleteNote {
	constructor(
		readonly id: string | number
	) {
		this.id = id;
	}
	async delete() {
		const sql = "DELETE FROM notes WHERE id = ?";
		const rows = await dbQuery<NoteIdAndTitle>(sql, [
			this.id
		]);
		return rows[0];
	}
}