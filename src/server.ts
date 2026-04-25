import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SERVER_INFO } from "./config.js";
import { registerTools } from "./tools/index.js";
import { registerResources } from "./resources/index.js";
import { registerPrompts } from "./prompts/index.js";

/** Builds a fully-configured server. Transport-agnostic (stdio, HTTP, tests). */
export function createServer(): McpServer {
	const server = new McpServer(SERVER_INFO);

	registerTools(server);
	registerResources(server);
	registerPrompts(server);

	return server;
}
