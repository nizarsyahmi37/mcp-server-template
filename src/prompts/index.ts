import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/** Prompts are reusable, user-invoked message templates. */
export function registerPrompts(server: McpServer) {
	server.registerPrompt(
		"summarize",
		{
			title: "Summarize",
			description: "Ask the model to summarize some text",
			argsSchema: {
				text: z.string()
			},
		},
		({ text }) => ({
			messages: [
				{
					role: "user",
					content: {
						type: "text",
						text: `Please summarize the following:\n\n${text}`
					},
				},
			],
		}),
	);
}
