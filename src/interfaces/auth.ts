/**
 * Interfaces for Auth.
 */

export interface RegisterAdmin {
	id?: string | number;
	username: string;
	first_name?: string;
	last_name?: string;
	user_email: string;
	user_password: string;
	role_id: number | string;
	date_created: Date | number;
}

export interface LoginUserEmail {
	user_email: string;
}

export interface LoginUserPassword {
	user_password: string;
}

export interface AuthUserSession {
	readonly id: number;
	readonly username: string;

	readonly role_id: number;
	readonly date_created: Date | number;
}
