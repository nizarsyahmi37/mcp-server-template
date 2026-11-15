import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const inputSchema = {
	a: z.number(),
	b: z.number()
};

const outputSchema = {
	sum: z.number()
};

/** Adds two numbers and returns the sum as text and structured content. */
export async function handleAdd({ a, b }: z.infer<z.ZodObject<typeof inputSchema>>): Promise<CallToolResult> {
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
}

/** Tool with structured output (outputSchema) and error handling. */
export function registerAdd(server: McpServer) {
	server.registerTool(
		"add",
		{
			title: "Add numbers",
			description: "Adds two numbers and returns the sum.",
			inputSchema,
			outputSchema,
			annotations: {
				readOnlyHint: true,
				destructiveHint: false,
				idempotentHint: true,
				openWorldHint: false
			},
		},
		handleAdd,
	);
}
