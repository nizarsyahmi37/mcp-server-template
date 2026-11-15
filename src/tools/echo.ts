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
				readOnlyHint: true,
				destructiveHint: false,
				idempotentHint: true,
				openWorldHint: false
			},
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
}
