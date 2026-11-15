#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

// IMPORTANT: with stdio, stdout is the protocol channel. Log to stderr only.
const server = createServer();
await server.connect(new StdioServerTransport());
console.error("mcp-server-template running on stdio");
