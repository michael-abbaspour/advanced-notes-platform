/**
 * Interfaces for Roles.
 */

export interface RoleId {
	id: number | string;
}

export interface Role {
	id?: number | string;
	role_name: string;
	role_description: string;
}