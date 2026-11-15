import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/** Tool with structured content and error handling. */
export function registerAdd(server: McpServer) {
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
}
