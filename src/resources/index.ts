import { ResourceTemplate, type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/** Resources expose read-only data the client/LLM can load as context. */
export function registerResources(server: McpServer) {
	// Static resource
	server.registerResource(
		"about",
		"about://server",
		{
			title: "About",
			description: "Info about this server",
			mimeType: "text/plain"
		},
		async (uri) => ({
			contents: [{
				uri: uri.href,
				text: "This server was created from the MCP starter template."
			}],
		}),
	);

	// Dynamic resource via URI template: greeting://Alice
	server.registerResource(
		"greeting",
		new ResourceTemplate("greeting://{name}", { list: undefined }),
		{
			title: "Greeting",
			description: "Personalized greeting"
		},
		async (uri, { name }) => ({
			contents: [{
				uri: uri.href,
				text: `Hello, ${name}!`
			}],
		}),
	);
}
