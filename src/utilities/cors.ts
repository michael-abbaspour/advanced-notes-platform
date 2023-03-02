/**
 * Custom utility function(s) and configuration for CORS.
 */

import cors from "cors";
import envProps from "../config/environment.js";

const port = envProps.SERVER_PORT || 7002;
const corsOptions = {
	credentials: true,
	origin: `http://localhost:${port}`
};

export const corsConfiguration = cors(corsOptions);