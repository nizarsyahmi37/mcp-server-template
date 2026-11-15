import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer as createHttpServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { createServer } from "./server.js";
import { isAuthorized } from "./middleware/auth.js";

const MAX_BODY_BYTES = 1_000_000;

export interface HttpAppOptions {
	authToken?: string;
}

function reject(res: ServerResponse, status: number, message: string, headers: Record<string, string> = {}) {
	res.writeHead(status, { "content-type": "text/plain", ...headers }).end(message);
}

async function readBody(req: IncomingMessage): Promise<string | undefined> {
	const chunks: Buffer[] = [];
	let size = 0;

	for await (const chunk of req) {
		size += (chunk as Buffer).length;

		if (size > MAX_BODY_BYTES) return undefined;

		chunks.push(chunk as Buffer);
	}

	return Buffer.concat(chunks).toString();
}

/** Stateless Streamable HTTP transport: a fresh server per request. */
export function createHttpApp(options: HttpAppOptions = {}): Server {
	return createHttpServer(async (req, res) => {
		if (req.url !== "/mcp") return reject(res, 404, "Not found");
		if (req.method !== "POST") return reject(res, 405, "Method not allowed", { Allow: "POST" });

		if (options.authToken && !isAuthorized(req, options.authToken)) {
			return reject(res, 401, "Unauthorized", { "WWW-Authenticate": 'Bearer realm="mcp"' });
		}

		const raw = await readBody(req);

		if (raw === undefined) return reject(res, 413, "Payload too large");

		let body: unknown;

		try {
			body = JSON.parse(raw);
		} catch {
			return reject(res, 400, "Invalid JSON");
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
}
