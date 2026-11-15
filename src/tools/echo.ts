import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const inputSchema = {
	message: z.string().describe("Text to echo back")
};

/** Returns the provided message unchanged. */
export async function handleEcho({ message }: z.infer<z.ZodObject<typeof inputSchema>>): Promise<CallToolResult> {
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
}

/** Simplest possible tool: validated input in, text out. */
export function registerEcho(server: McpServer) {
	server.registerTool(
		"echo",
		{
			title: "Echo",
			description: "Echoes back the provided message.",
			inputSchema,
			annotations: {
				readOnlyHint: true,
				destructiveHint: false,
				idempotentHint: true,
				openWorldHint: false
			},
		},
		handleEcho,
	);
}
