import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/** Tool with structured output (outputSchema) and error handling. */
export function registerAdd(server: McpServer) {
	server.registerTool(
		"add",
		{
			title: "Add numbers",
			description: "Adds two numbers and returns the sum.",
			inputSchema: {
				a: z.number(),
				b: z.number()
			},
			outputSchema: {
				sum: z.number()
			},
			annotations: {
				readOnlyHint: true,
				destructiveHint: false,
				idempotentHint: true,
				openWorldHint: false
			},
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
