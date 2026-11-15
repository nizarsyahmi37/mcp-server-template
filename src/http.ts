import { createHttpApp } from "./http-app.js";
import { HOST, PORT } from "./config.js";

createHttpApp().listen(PORT, HOST, () => {
	console.error(`mcp-server-template on http://${HOST}:${PORT}/mcp`);
});
