/**
 * Category Interfaces.
 */

export interface Category {
	id?: number | string;
	category_name: string;
	category_type_id: number | string;
	category_description?: string;
	color_id: number | string;
}

export interface CategoryIdAndName {
	id: number | string;
	category_name: string;
}

export interface CategoryForeignKeyJoin {
	id: number | string;
	name: string;
	type: string;
	description: string;
	color: string;
}