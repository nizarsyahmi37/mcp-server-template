/** Central place for server identity and config. Rename these for your project. */
export const SERVER_INFO = {
	name: "my-mcp-server",
	version: "0.1.0",
} as const;

export const PORT = Number(process.env.PORT ?? 3000);
