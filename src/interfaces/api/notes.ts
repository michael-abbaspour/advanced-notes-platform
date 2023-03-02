/**
 * Interface(s) for Notes.
 */

export interface Note {
	id?: string | number;
	readonly user_id: string | number;
	readonly date_created: Date;
	category_id: string | number;
	tag_id: string | number;
	note_title: string;
	note_body: string;
	readonly last_edited: Date;
	readonly unique_id: string;
}

export interface NoteId {
	id: string | number;
}

export interface NoteIdAndTitle {
	id: string | number;
	note_title: string;
}

export interface NoteForeignKeyJoin {
	id: string | number;
	readonly user_id: string | number;
	category_name: string;
	tag_name: string;
	note_title: string;
	note_body: string;
	last_edited: Date;
}