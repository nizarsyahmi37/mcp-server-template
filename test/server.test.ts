import { test } from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "../src/server.js";

import assert from "node:assert/strict";

async function connect() {
	const server = createServer();
	const client = new Client({
		name: "test",
		version: "0.0.0"
	});

	const [a, b] = InMemoryTransport.createLinkedPair();

	await Promise.all([
		server.connect(a),
		client.connect(b)
	]);

	return client;
}

test("lists tools", async () => {
	const client = await connect();
	const { tools } = await client.listTools();

	assert.deepEqual(
		tools.map((t) => t.name).sort(),
		[
			"add",
			"echo"
		]
	);
});

test("echo returns the message", async () => {
	const client = await connect();
	const res: any = await client.callTool({
		name: "echo",
		arguments: {
			message: "hi"
		}
	});

	assert.equal(res.content[0].text, "hi");
});

test("add returns structured sum", async () => {
	const client = await connect();
	const res: any = await client.callTool({
		name: "add",
		arguments: {
			a: 2,
			b: 3
		}
	});

	assert.equal(res.structuredContent.sum, 5);
});
