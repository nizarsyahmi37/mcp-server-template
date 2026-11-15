import { createHttpApp } from "./http-app.js";
import { AUTH_TOKEN, HOST, PORT, RATE_LIMIT } from "./config.js";

if (!AUTH_TOKEN && HOST !== "127.0.0.1" && HOST !== "localhost") {
	console.error("WARNING: listening on a non-loopback address without MCP_AUTH_TOKEN. Anyone who can reach this port can use your tools.");
}

createHttpApp({ authToken: AUTH_TOKEN, rateLimit: RATE_LIMIT }).listen(PORT, HOST, () => {
	console.error(`mcp-server-template on http://${HOST}:${PORT}/mcp (auth ${AUTH_TOKEN ? "on" : "off"})`);
});
