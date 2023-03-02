/**
 * Model(s) for Color.
 */

import { dbQuery } from "../utilities/db.js";
import { Color } from "../interfaces/api/colors.js";

export class GetColors {
	async readColors() {
		const sql = "SELECT * FROM colors";
		return await dbQuery<Color>(sql);
	}
}

export class GetColorById {
	constructor(readonly id: number | string) {
		this.id = id;
	}

	async readColorById() {
		const sql = "SELECT color_name, color_code FROM colors WHERE id = ?";
		const rows = await dbQuery<Color>(sql, [
			this.id
		]);
		return rows[0];
	}
}