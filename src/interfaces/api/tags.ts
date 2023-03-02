/**
 * Interfaces and Types for Tags.
 */

export interface Tag {
	id?: string | number;
	tag_name: string;
	tag_description?: string;

	color_id: string | number;
}

export interface TagId {
	id: string | number;
}

export interface TagsForeignKeyLeftJoin {
	id: number | string;
	tag_name: string;
	tag_description?: string;
	color_code: string;
}