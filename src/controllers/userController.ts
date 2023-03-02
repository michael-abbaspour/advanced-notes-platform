/**
 * Controller for Users.
 */

import envProps from "../config/environment.js";
import { GetUsers, GetUserById, AddUser } from "../models/userModel.js";
import * as bcrypt from "bcrypt";
import { generateUsername } from "../utilities/generator.js";
import { NextFunction, Request, Response } from "express";

export const renderDashboard = function(request: Request, response: Response) {
	response.render("dashboard/dashboard");
};
export const readAllUsers = async function(request: Request, response: Response) {
	const retrieveUsers = new GetUsers();
	const results = await retrieveUsers.readAll();

	response.status(200).json(results);
};

export const readUserById = async function(request: Request, response: Response) {
	const userId = request.params.id;
	const retrieveUsers = new GetUserById(userId);
	const results = await retrieveUsers.readById();

	response.status(200).json(results);
};

export const readCurrentUser = function(request: Request, response: Response, next: NextFunction) {
	try {
		const user = response.locals.user;
		response.status(200).json({
			status: "success",
			data: {
				user,
			}
		});
	} catch (err: any) {
		next(err);
	}
};

export const createUser = async function(request: Request, response: Response) {
	try {
		const { username, user_email, user_password, first_name, last_name, role_id } = request.body;
		const updatedUsername = username === "" ? generateUsername(first_name, last_name) : "";
		const updatedPassword = await bcrypt.hash(user_password, 12);
		const updatedRoleId = role_id === "" ? envProps.UTILIZER_ROLE_ID : "";
		const updatedDateCreated = new Date();
		const newUser = new AddUser(updatedUsername, user_email, updatedPassword, first_name, last_name, updatedRoleId, updatedDateCreated);
		const results = await newUser.create();

		response.status(201).json(results);
	} catch (err) {
		response.json(err);
	}
};

export const readLoggedInUser = function(request: Request, response: Response, next: NextFunction) {
	try {
		const user = response.locals.user;
		response.status(200).json({
			status: "Success",
			data: {
				user
			}
		});
	} catch(err: any) {
		next(err);
	}
};