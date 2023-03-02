/**
 * Model(s) for Category Types.
 */

import { dbQuery } from "../utilities/db.js";
import { CategoryType, CategoryTypeName } from "../interfaces/api/categoryTypes.js";

export class GetCategoryTypes {

	async readAll() {
		const sql = "SELECT * FROM category_types";
		return await dbQuery<CategoryType>(sql);
	}
	async readById(id: string) {
		const sql = "SELECT type_name FROM category_types WHERE id = ?";
		const rows = await dbQuery<CategoryType>(sql, [
			id
		]);
		return rows[0];
	}
}

export class GetCategoryTypeById {
	constructor(readonly id: number | string) {
		this.id = id;
	}
	async readById() {
		const sql = "SELECT type_name FROM category_types WHERE id = ?";
		const rows = await dbQuery<CategoryType>(sql, [
			this.id
		]);
		return rows[0];
	}
}

export class AddCategoryType implements CategoryTypeName {
	constructor(
		public type_name: string
	) {
		this.type_name = type_name;
	}
	async create() {
		const sql = "INSERT INTO category_types (type_name) VALUES (?)";
		const rows = await dbQuery<CategoryType>(sql,[
			this.type_name
		]);
		return rows[0];
	}
}

export class UpdateCategoryType {
	constructor(
		readonly id: number | string,
		public type_name: string
	) {
		this.type_name = type_name;
	}
	async update() {
		const sql = "UPDATE category_types SET type_name = ? WHERE id = ?";
		const rows = await dbQuery<CategoryType>(sql, [
			this.type_name, this.id
		]);
		return rows[0];
	}
}

export class DeleteCategoryType {
	constructor(
		readonly id: number | string
	) {
		this.id = id;
	}
	async delete() {
		const sql = "DELETE FROM category_types WHERE id = ?";
		const rows = await dbQuery<CategoryType>(sql, [
			this.id
		]);
		return rows[0];
	}
}