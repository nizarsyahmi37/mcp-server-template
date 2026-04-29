# MCP Server Starter

A minimal, batteries-included template for building your own
[Model Context Protocol](https://modelcontextprotocol.io) server in TypeScript.
It ships with example **tools**, **resources**, and **prompts**, both **stdio** and
**Streamable HTTP** transports, and an in-memory test setup.

## Quick start

```bash
npm install
npm test            # run the example tests
npm run inspect     # open the MCP Inspector against your server
```

## Structure

```
src/
	config.ts          server name/version, port  (rename these first)
	server.ts          createServer(): wires tools/resources/prompts
	index.ts           stdio entrypoint (Claude Desktop, Claude Code, Cursor…)
	http.ts            Streamable HTTP entrypoint (remote use, POST /mcp)
	tools/             one file per tool + index.ts registry
	resources/         read-only data exposed to the client
	prompts/           reusable prompt templates
test/                tests using an in-memory client<->server transport
```

## Make it yours

1. Rename the package in `package.json` and `src/config.ts`.
2. Add a tool: copy `src/tools/echo.ts`, change the name/schema/handler, and register it in `src/tools/index.ts`.
3. Delete the examples you don't need (`add`, `greeting`, `summarize`).

## Connect it to a client

Build first (`npm run build`), then use an absolute path:

**Claude Code**

```bash
claude mcp add my-mcp-server -- node /absolute/path/to/dist/index.js
```

**Claude Desktop / Cursor** (`mcpServers` config)

```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"]
    }
  }
}
```

**Remote (HTTP):** `npm run start:http`, then point a client at `http://localhost:3000/mcp`.
Add authentication before exposing it publicly.

## Notes

- **stdio servers must never write to stdout** (it's the protocol channel). Use `console.error` for logs.
- Tool inputs are validated with [zod](https://zod.dev); describe fields with `.describe()` so the model knows how to use them.
- Set `annotations` (`readOnlyHint`, `destructiveHint`, …) so clients can decide when to ask for confirmation.
- Publish to npm: the `bin` field is set, so users can run it with `npx your-package`.

## Scripts

| Script                    | What it does                        |
| ------------------------- | ----------------------------------- |
| `npm run dev`             | Run stdio server with auto-reload   |
| `npm run dev:http`        | Run HTTP server with auto-reload    |
| `npm run build` / `start` | Compile / run compiled stdio server |
| `npm run inspect`         | Debug with MCP Inspector            |
| `npm test`                | Run tests                           |
