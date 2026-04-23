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
				idempotentHint: true
			},
		},
		async ({ a, b }) => {
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
		},
	);
}
