import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SERVER_INFO } from "./config.js";

/** Builds a fully-configured server. Transport-agnostic (stdio, HTTP, tests). */
export function createServer(): McpServer {
  const server = new McpServer(SERVER_INFO);
  return server;
}
