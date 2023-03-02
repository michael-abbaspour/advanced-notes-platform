/**
 * Controller for Auth logic.
 */

import envProps from "../config/environment.js";
import { NextFunction, Request, Response } from "express";
import { AuthSession, Login, Register } from "../models/authModel.js";
import * as bcrypt from "bcrypt";
import { generateUsername } from "../utilities/generator.js";
import { AppError, HttpCode } from "../utilities/errors/appError.js";

export const renderRegisterPage = function(request: Request, response: Response) {
	response.render("register");
};

export const renderLogin = function(request: Request, response: Response) {
	response.render("login");
};

export const registerAdminHandler = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const { username, user_email, user_password, first_name, last_name, role_id } = request.body;
		const updatedUsername = username === "" ? generateUsername(first_name, last_name) : "";
		const updatedPassword = await bcrypt.hash(user_password, 12);
		const updatedRoleId = role_id === "" ? envProps.ADMIN_ROLE_ID : "";
		const updatedDateCreated = new Date();
		const newUser = new Register(updatedUsername, user_email, updatedPassword, first_name, last_name, updatedRoleId, updatedDateCreated);
		const result = await newUser.create();

		response.status(201).render("login", {
			result
		});
	} catch (err) {
		next(err);
	}
};

export const loginHandler = async function(request: Request, response: Response, next: NextFunction) {
	try {
		const { user_email, user_password } = request.body;
		const newLogin = new Login(user_email);
		const userLoginEmail = await newLogin.checkEmailExists();
		const userLoginPassword = await newLogin.checkUserPassword();
		const userPasswordCompare = await bcrypt.compare(user_password, userLoginPassword.user_password);

		if (!userLoginEmail) {
			return next(new AppError({
				name: "Invalid Email",
				httpCode: HttpCode.NOT_FOUND,
				description: "Email not found. Please try again."
			}));
		}
		if (!userPasswordCompare) {
			return next(new AppError({
				name: "Invalid Password",
				httpCode: HttpCode.NOT_FOUND,
				description: "Password is not correct. Please try again."
			}));
		}

		const authSession = new AuthSession(user_email);
		const authSessionValues = await authSession.sessionValues();
		const user = {
			id: authSessionValues.id,
			username: authSessionValues.username,
			role_id: authSessionValues.role_id,
			date_created: authSessionValues.date_created
		};
		request.session.user = user;

		response.status(200).render("dashboard/dashboard", {
			user
		});
	} catch(err) {
		next(err);
	}
};

export const logoutHandler = async function(request: Request, response: Response, next: NextFunction) {
	await request.session.destroy(function(err) {
		if (err) {
			next(err);
		} else {
			response.redirect("/login");
		}
	});
};


