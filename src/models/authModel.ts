/**
 * Models for Authentication and Authorization.
 */

import { dbQuery } from "../utilities/db.js";
import { RegisterAdmin, LoginUserEmail, LoginUserPassword, AuthUserSession } from "../interfaces/auth.js";

export class Register implements RegisterAdmin {
	constructor(
		readonly username: string,
		readonly first_name: string,
		readonly last_name: string,
		readonly user_email: string,
		readonly user_password: string,
		readonly role_id: number | string,
		readonly date_created: Date | number
	) {
		this.username = username;
		this.first_name = first_name;
		this.last_name = last_name;
		this.user_email = user_email;
		this.user_password = user_password;
		this.role_id = role_id;
		this.date_created = date_created;
	}
	async create() {
		const sql = "INSERT INTO users (username, user_email, user_password, first_name, last_name, role_id, date_created) VALUES (?, ?, ?, ?, ?, ?, ?)";
		const rows = await dbQuery<RegisterAdmin>(sql, [
			this.username, this.first_name, this.last_name, this.user_email, this.user_password, this.role_id, this.date_created
		]);
		return rows[0];
	}
}

export class Login implements LoginUserEmail {
	constructor(
		public user_email: string,
	) {
		this.user_email = user_email;
	}
	async checkEmailExists() {
		const sql = "SELECT user_email FROM users WHERE user_email = ?";
		const rows = await dbQuery<LoginUserEmail>(sql,[
			this.user_email
		]);
		return rows[0];
	}
	async checkUserPassword() {
		const sql = "SELECT user_password FROM users WHERE user_email = ?";
		const rows = await dbQuery<LoginUserPassword>(sql, [
			this.user_email
		]);
		return rows[0];
	}
}

export class AuthSession implements LoginUserEmail {
	constructor(public user_email: string) {
		this.user_email = user_email;
	}

	async sessionValues() {
		const sql = "SELECT id, username, role_id, date_created FROM users WHERE user_email = ?";
		const rows = await dbQuery<AuthUserSession>(sql, [
			this.user_email
		]);
		return rows[0];
	}
}






