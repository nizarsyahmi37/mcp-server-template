import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Logic for the example tools lives in echo.ts and add.ts; they are registered
 * in src/server.ts. For tools you'd rather register separately, export a
 * `register<Name>(server)` function that calls `server.tool(...)` and call it
 * below.
 */
export function registerTools(_server: McpServer) {
	// registerMyTool(_server);
}
