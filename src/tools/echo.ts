import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/** Simplest possible tool: validated input in, text out. */
export function registerEcho(server: McpServer) {
	server.registerTool(
		"echo",
		{
			title: "Echo",
			description: "Echoes back the provided message.",
			inputSchema: {
				message: z.string().describe("Text to echo back")
			},
			annotations: {
				readOnlyHint: true
			},
		},
		async ({ message }) => ({
			content: [{
				type: "text",
				text: message
			}],
		}),
	);
}
