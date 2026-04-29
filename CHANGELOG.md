# Changelog

All notable changes to this project are documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-04-29

### Added

- **project:** initialize TypeScript project with package manifest, tsconfig, gitignore and env example
- **server:** add `createServer()` factory and central server config
- **transport:** add stdio entrypoint with stderr-only logging and a `bin` executable
- **tools:** add `echo` example tool and a central registry for registering tools
- **tools:** add `add` example tool demonstrating `outputSchema` and structured content
- **resources:** add static `about://server` and templated `greeting://{name}` resources
- **prompts:** add `summarize` example prompt
- **transport:** add stateless Streamable HTTP entrypoint served at `POST /mcp`
- **test:** add in-memory client/server tests covering tool listing, `echo` and `add`
- **mcp:** add sample `.mcp.json` for registering the server in MCP clients
- **docs:** add README with quick start, project structure, customization steps and client configs
