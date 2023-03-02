/**
 * Model(s) for Tags.
 */

import { dbQuery } from "../utilities/db.js";
import { TagId, Tag, TagsForeignKeyLeftJoin } from "../interfaces/api/tags.js";

export class GetTags {
	async readAll() {
		const sql = "SELECT * FROM tags";
		return await dbQuery<Tag>(sql);
	}
	async readIdAndName() {
		const sql = "SELECT id, tag_name FROM tags";
		return await dbQuery<Tag>(sql);
	}
	async readForeignKeyLeftJoin() {
		const sql = "SELECT tg.id, tg.tag_name, tg.tag_description, c.color_code FROM tags tg LEFT JOIN colors c on tg.color_id = c.id";
		return await dbQuery<TagsForeignKeyLeftJoin>(sql);
	}
}

export class GetTagById implements TagId {
	constructor(readonly id: string | number) {
		this.id = id;
	}
	async getById() {
		const sql = "SELECT tag_name, tag_description, color_id FROM tags WHERE id = ?";
		const rows = await dbQuery<Tag>(sql,[
			this.id
		]);
		return rows[0];
	}
}

export class AddTag implements Tag {
	constructor(
		public tag_name: string,
		public tag_description: string,
		public color_id: string | number = 1
	) {
		this.tag_name = tag_name;
		this.tag_description = tag_description;
		this.color_id = color_id;
	}
	async create() {
		const sql = "INSERT INTO tags (tag_name, tag_description, color_id) VALUES (?, ?, ?)";
		const rows = await dbQuery<Tag>(sql,[
			this.tag_name, this.tag_description, this.color_id
		]);
		return rows[0];
	}
}

export class UpdateTag implements Tag {
	constructor(
		readonly id: string | number,
		public tag_name: string,
		public tag_description: string,
		public color_id: string | number
	) {
		this.id = id;
		this.tag_name = tag_name;
		this.tag_description = tag_description;
		this.color_id = color_id;
	}
	async update() {
		const sql = "UPDATE tags SET tag_name = ?, tag_description = ?, color_id = ? WHERE id = ?";
		const rows = await dbQuery<Tag>(sql, [
			this.tag_name, this.tag_description, this.color_id, this.id
		]);
		return rows[0];
	}
}

export class DeleteTag {
	constructor(
		readonly id: string | number
	) {
		this.id = id;
	}
	async delete() {
		const sql = "DELETE FROM tags WHERE id = ?";
		const rows = await dbQuery<Tag>(sql, [
			this.id
		]);
		return rows[0];
	}
}