import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerEcho } from "./echo.js";

/** Add new tools here: create src/tools/<name>.ts, then register it below. */
export function registerTools(server: McpServer) {
  registerEcho(server);
}
