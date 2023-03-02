/**
 * Interfaces for the User.
 */

export interface User {
	id?: string | number;
	username: string;
	first_name?: string;
	last_name?: string;
	user_email: string;
	user_password: string;
	role_id: number | string;
	date_created: Date;
}

export interface UserId {
	id: string | number;
}

export interface UserEmail {
	user_email: string;
}

export interface UserPassword {
	readonly user_password: string;
}

