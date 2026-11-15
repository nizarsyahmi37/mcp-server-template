import { test } from "node:test";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import { createHttpApp, type HttpAppOptions } from "../src/http-app.js";

const INIT = {
	jsonrpc: "2.0",
	id: 1,
	method: "initialize",
	params: {
		protocolVersion: "2025-03-26",
		capabilities: {},
		clientInfo: { name: "test", version: "0.0.0" },
	},
};

async function withApp(options: HttpAppOptions, run: (url: string) => Promise<void>) {
	const app = createHttpApp(options);

	await new Promise<void>((resolve) => app.listen(0, "127.0.0.1", resolve));

	const { port } = app.address() as AddressInfo;

	try {
		await run(`http://127.0.0.1:${port}/mcp`);
	} finally {
		app.closeAllConnections();
		await new Promise((resolve) => app.close(resolve));
	}
}

function post(url: string, headers: Record<string, string> = {}) {
	return fetch(url, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			accept: "application/json, text/event-stream",
			...headers,
		},
		body: JSON.stringify(INIT),
	});
}

test("http: initialize succeeds when no token is configured", async () => {
	await withApp({}, async (url) => {
		assert.equal((await post(url)).status, 200);
	});
});

test("http: rejects non-POST and unknown paths", async () => {
	await withApp({}, async (url) => {
		assert.equal((await fetch(url)).status, 405);
		assert.equal((await fetch(url.replace("/mcp", "/nope"))).status, 404);
	});
});
