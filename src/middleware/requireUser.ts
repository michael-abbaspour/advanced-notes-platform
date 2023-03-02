/**
 * Middleware for checking to see if a user currently is logged in and has a session.
 */

import { NextFunction, Request, Response } from "express";
import { AppError, HttpCode } from "../utilities/errors/appError.js";

export const requireUser = function(request: Request, response: Response, next: NextFunction) {
	try {
		const user = request.session.user;
		if (!user) {
			return next(new AppError({
				name: "User Not Found",
				httpCode: HttpCode.NOT_FOUND,
				description: "User not found and must be properly logged in."
			}));
		}
		next();
	} catch(err) {
		next(err);
	}
};
