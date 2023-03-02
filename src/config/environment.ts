/**
 * The environment variables file.
 */

import envVariables from "../env.js";

type EnvVariablesType = {
	readonly SERVER_PORT: number;
	readonly DB_HOST: string;
	readonly DB_USER: string;
	readonly DB_PASSWORD: string;
	readonly DB_DATABASE: string;
	readonly PUBLIC_KEY: string;
	readonly PRIVATE_KEY: string;
	readonly SESSION_SECRET: string;
	readonly ACCESS_TOKEN_EXPIRATION: number;
	readonly ADMIN_ROLE_ID: number;
	readonly UTILIZER_ROLE_ID: number;
}

const envProps: EnvVariablesType = {
	SERVER_PORT: envVariables.SERVER_PORT,
	DB_HOST: envVariables.DB_HOST,
	DB_USER: envVariables.DB_USER,
	DB_PASSWORD: envVariables.DB_PASSWORD,
	DB_DATABASE: envVariables.DB_DATABASE,
	PUBLIC_KEY: envVariables.PUBLIC_KEY,
	PRIVATE_KEY: envVariables.PRIVATE_KEY,
	SESSION_SECRET: envVariables.SESSION_SECRET,
	ACCESS_TOKEN_EXPIRATION: envVariables.ACCESS_TOKEN_EXPIRATION,
	ADMIN_ROLE_ID: envVariables.ADMIN_ROLE_ID,
	UTILIZER_ROLE_ID: envVariables.UTILIZER_ROLE_ID
};

export default envProps;