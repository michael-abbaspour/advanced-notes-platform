/**
 * Database configuration file.
 */

import envProps from "../config/environment.js";
import * as mysql from "mysql2/promise";
import MySQLStore from "express-mysql-session";
import session from "express-session";

export type dbDefaults = mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.OkPacket;
export type DbQueryResult<T> = T & dbDefaults;

const dbConfig = {
	host: envProps.DB_HOST,
	user: envProps.DB_USER,
	password: envProps.DB_PASSWORD,
	database: envProps.DB_DATABASE,
	waitForConnections: true
};

const pool = mysql.createPool(dbConfig);
// @ts-ignore
const sessionStore = new MySQLStore({}, pool);

export const sessionOptions = session({
	store: sessionStore,
	secret: envProps.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		httpOnly: true,
		maxAge: 1000 * 60 * 10
	}
});

export const dbQuery = async function<T>(sql: string, options?: unknown): Promise<DbQueryResult<T[]>> {
	const [result] = await pool.query<DbQueryResult<T[]>>(sql, options);
	return result;
};
