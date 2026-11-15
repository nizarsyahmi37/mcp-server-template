/** Central place for server identity and config. Rename these for your project. */
export const SERVER_INFO = {
	name: "mcp-server-template",
	version: "0.1.0",
} as const;

export const PORT = Number(process.env.PORT ?? 3000);
/** Bind to loopback by default. Set HOST=0.0.0.0 only behind authentication. */
export const HOST = process.env.HOST ?? "127.0.0.1";
/** When set, every HTTP request must send `Authorization: Bearer <token>`. */
export const AUTH_TOKEN = process.env.MCP_AUTH_TOKEN || undefined;
