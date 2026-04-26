import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer as createHttpServer } from "node:http";
import { createServer } from "./server.js";
import { PORT } from "./config.js";

/** Stateless Streamable HTTP transport: a fresh server per request. */
const http = createHttpServer(async (req, res) => {
	if (req.url !== "/mcp") {
		res.writeHead(404).end("Not found");
		return;
	}
	if (req.method !== "POST") {
		res.writeHead(405, { Allow: "POST" }).end("Method not allowed");
		return;
	}

	const chunks: Buffer[] = [];

	for await (const chunk of req) chunks.push(chunk as Buffer);

	let body: unknown;

	try {
		body = JSON.parse(Buffer.concat(chunks).toString());
	} catch {
		res.writeHead(400).end("Invalid JSON");

		return;
	}

	const server = createServer();
	const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });

	res.on("close", () => {
		transport.close();
		server.close();
	});

	await server.connect(transport);
	await transport.handleRequest(req, res, body);
});

http.listen(PORT, () => console.error(`my-mcp-server on http://localhost:${PORT}/mcp`));
