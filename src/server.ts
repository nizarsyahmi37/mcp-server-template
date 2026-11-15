import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SERVER_INFO } from "./config.js";
import { registerTools } from "./tools/index.js";
import { registerResources } from "./resources/index.js";
import { registerPrompts } from "./prompts/index.js";

/** Builds a fully-configured server. Transport-agnostic (stdio, HTTP, tests). */
export function createServer(): McpServer {
	const server = new McpServer(SERVER_INFO);

	// Example tools live next to the server so each handler is easy to find
	// and read alongside its description. Add larger tools in src/tools/.
	server.tool(
		"echo",
		"Echoes back the provided message.",
		{
			message: z.string().describe("Text to echo back")
		},
		{
			title: "Echo",
			readOnlyHint: true,
			destructiveHint: false,
			idempotentHint: true,
			openWorldHint: false
		},
		async ({ message }) => {
			try {
				return {
					content: [{
						type: "text",
						text: message
					}],
				};
			} catch (error) {
				return {
					isError: true,
					content: [{
						type: "text",
						text: `echo failed: ${error instanceof Error ? error.message : String(error)}`
					}],
				};
			}
		},
	);

	server.tool(
		"add",
		"Adds two numbers and returns the sum.",
		{
			a: z.number(),
			b: z.number()
		},
		{
			title: "Add numbers",
			readOnlyHint: true,
			destructiveHint: false,
			idempotentHint: true,
			openWorldHint: false
		},
		async ({ a, b }) => {
			try {
				const sum = a + b;

				return {
					content: [{
						type: "text",
						text: String(sum)
					}],
					structuredContent: {
						sum
					},
				};
			} catch (error) {
				return {
					isError: true,
					content: [{
						type: "text",
						text: `add failed: ${error instanceof Error ? error.message : String(error)}`
					}],
				};
			}
		},
	);

	registerTools(server);
	registerResources(server);
	registerPrompts(server);

	return server;
}
