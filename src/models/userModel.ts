/**
 * Model(s) for Users.
 */

import { dbQuery } from "../utilities/db.js";
import { User, UserId, UserEmail, UserPassword } from "../interfaces/api/users.js";

export class GetUsers {
	async readAll() {
		const sql = "SELECT id, username, first_name, last_name, user_email, role_id, date_created FROM users";
		return await dbQuery<User>(sql);
	}
}

export class GetUserById implements UserId {
	constructor(readonly id: string | number) {
		this.id = id;
	}
	async readById() {
		const sql = "SELECT username, first_name, last_name, user_email, role_id, date_created FROM users WHERE id = ?";
		const rows = await dbQuery<User>(sql, [
			this.id
		]);
		return rows[0];
	}
}

export class AddUser implements User {
	constructor(
		readonly username: string,
		public user_email: string,
		readonly user_password: string,
		public first_name: string,
		public last_name: string,
		readonly role_id: number | string,
		readonly date_created: Date
	) {
		this.username = username;
		this.user_email = user_email;
		this.user_password = user_password;
		this.first_name = first_name;
		this.last_name = last_name;
		this.role_id = role_id;
		this.date_created = date_created;
	}
	async create() {
		const sql = "INSERT INTO users (username, user_email, user_password, first_name, last_name, role_id, date_created) VALUES (?, ?, ?, ?, ?, ?, ?)";
		const rows = await dbQuery<User>(sql,[
			this.username, this.user_email, this.user_password, this.first_name, this.last_name, this.role_id, this.date_created
		]);
		return rows[0];
	}
}

export class ValidateUser implements UserEmail {
	constructor(readonly user_email: string) {
		this.user_email = user_email;
	}
	async checkPassword() {
		const sql = "SELECT user_password FROM users WHERE user_email = ?";
		const rows = await dbQuery<UserPassword>(sql, [
			this.user_email
		]);
		return rows[0];
	}
}



