/**
 * Interface(s) and Type(s) for the Session object.
 */

import { AuthUserSession } from "./auth.js";

declare module "express-session" {
	interface SessionData {
		user: AuthUserSession
	}
}

