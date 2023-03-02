/**
 * Controller for the Index area(s).
 */

import { Request, Response, NextFunction } from "express";

export const renderIndexPage = function(request: Request, response: Response, next: NextFunction) {
	try {
		const user = request.session.user;

		if (user) {
			response.redirect("/dashboard");
		} else {
			response.render("index");
		}
	} catch(err) {
		next(err);
	}
};