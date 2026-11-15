# MCP Server Starter

[![M8ven Verified](https://m8ven.ai/badge/mcp/nizarsyahmi37-mcp-server-template-1prs1i?variant=verified)](https://m8ven.ai/mcp/nizarsyahmi37-mcp-server-template-1prs1i?s=readme)

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
	tools/             registry for extra tools you add (echo/add live in server.ts)
	resources/         read-only data exposed to the client
	prompts/           reusable prompt templates
test/                tests using an in-memory client<->server transport
```

## Make it yours

1. Rename the package in `package.json` and `src/config.ts`.
2. Add a tool: copy the `echo` example in `src/server.ts` (or put it in its own `src/tools/<name>.ts` and register it in `src/tools/index.ts`), then change the name, schema and handler.
3. Delete the examples you don't need (`add`, `greeting`, `summarize`).

## Connect it to a client

Build first (`npm run build`), then use an absolute path:

**Claude Code**

```bash
claude mcp add mcp-server-template -- node /absolute/path/to/dist/index.js
```

**Claude Desktop / Cursor** (`mcpServers` config)

```json
{
  "mcpServers": {
    "mcp-server-template": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"]
    }
  }
}
```

**Remote (HTTP):** `npm run start:http`, then point a client at `http://127.0.0.1:3000/mcp`.

The HTTP server is secure by default for local use and configurable for deployment:

| Variable | Default | Purpose |
| --- | --- | --- |
| `HOST` | `127.0.0.1` | Bind address. Only set `0.0.0.0` behind authentication. |
| `MCP_AUTH_TOKEN` | unset | When set, requests need `Authorization: Bearer <token>`. |
| `RATE_LIMIT_MAX` | `60` | Max requests per client per window. |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Rate limit window length. |

Rate limiting is per client IP and kept in memory. Behind a reverse proxy every request shares the proxy's IP, so rate limit at the proxy as well.

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

## License

[MIT](LICENSE)
