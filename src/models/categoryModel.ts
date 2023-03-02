/**
 * Models for the Category object.
 */

import { dbQuery } from "../utilities/db.js";
import { Category, CategoryIdAndName, CategoryForeignKeyJoin  } from "../interfaces/api/categories.js";

export class GetCategories {
	async readAll() {
		const sql = "SELECT * FROM categories";
		return await dbQuery<Category>(sql);
	}
	async readById(id: string) {
		const sql = "SELECT category_name, category_type_id, category_description, color_id FROM categories WHERE id = ?";
		const rows = await dbQuery<Category>(sql, [
			id
		]);
		return rows[0];
	}
	async readIdAndName() {
		const sql = "SELECT id, category_name FROM categories";
		return await dbQuery<CategoryIdAndName>(sql);
	}
	async readForeignTableJoin() {
		const sql = "SELECT cat.id, cat.category_name, ct.type_name, cat.category_description, c.color_code FROM categories cat LEFT JOIN category_types ct ON cat.category_type_id = ct.id LEFT JOIN colors c ON cat.color_id = c.id";
		return await dbQuery<CategoryForeignKeyJoin>(sql);
	}
}

export class AddCategory implements Category {
	constructor(
		public category_name: string,
		public category_type_id: number | string,
		public category_description: string,
		public color_id: number | string
	) {
		this.category_name = category_name;
		this.category_type_id = category_type_id;
		this.category_description = category_description;
		this.color_id = color_id;
	}
	async create() {
		const sql = "INSERT INTO categories (category_name, category_type_id, category_description, color_id) VALUES (?, ?, ?, ?)";
		const rows = await dbQuery<Category>(sql, [
			this.category_name, this.category_type_id, this.category_description, this.color_id
		]);
		return rows[0];
	}
}

export class UpdateCategory {
	constructor(
		readonly id: number | string,
		public category_name: string,
		public category_type_id: number | string,
		public category_description: string,
		public color_id: number | string
	) {
		this.id = id;
		this.category_name = category_name;
		this.category_type_id = category_type_id;
		this.category_description = category_description;
		this.color_id = color_id;
	}
	async update() {
		const sql = "UPDATE categories SET category_name = ?, category_type_id = ?, category_description = ?, color_id = ? WHERE id = ?";
		const rows = await dbQuery<Category>(sql, [
			this.category_name, this.category_type_id, this.category_description, this.color_id, this.id
		]);
		return rows[0];
	}
}

export class DeleteCategory {
	constructor(
		readonly id: number | string
	) {
		this.id = id;
	}
	async delete() {
		const sql = "DELETE FROM categories WHERE id = ?";
		const rows = await dbQuery<CategoryIdAndName>(sql, [
			this.id
		]);
		return rows[0];
	}
}