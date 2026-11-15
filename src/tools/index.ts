import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Register additional tools here. Create src/tools/<name>.ts exporting a
 * `register<Name>(server)` function that calls `server.tool(...)`, then call
 * it below. The `echo` and `add` examples are defined in src/server.ts.
 */
export function registerTools(_server: McpServer) {
	// registerMyTool(_server);
}
