# Changelog

All notable changes to this project are documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Security

- **deps:** upgrade `zod` from 3.25.76 to 4.6.7 to fix GHSA-mrhx-c7xc-m3w5 (memory exhaustion when validating oversized constrained collections)

### Changed

- **tools:** declare all four annotation hints (`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`) as explicit booleans on `echo` and `add`, and add a test that enforces it
- **tools:** handle errors explicitly in `echo` and `add`, returning an `isError` result instead of throwing
- **http:** extract `createHttpApp()` from the HTTP entrypoint so it can be tested, bind to `127.0.0.1` by default (configurable with `HOST`), and reject request bodies over 1 MB
- **package:** publish as `@nizarsyahmi37/mcp-server-template`, add `homepage`, `repository`, `bugs`, `author` and `keywords` metadata, and rename the server and `bin` to `mcp-server-template`
- **test:** compile tests with `tsc` and run them with the built-in Node test runner, and drop `tsx` from devDependencies (watch scripts now use `npx tsx`), so installing and testing no longer pulls in native `esbuild` binaries
- **ci:** run on `ubuntu-26.04` instead of `ubuntu-latest`, adopting the generally available Ubuntu 26.04 runner image ahead of the `ubuntu-latest` migration and keeping the build environment explicit
- **tools:** register `echo` and `add` with the flat `server.tool(name, description, schema, annotations, handler)` form and inline handlers so static analysis can resolve each handler and check its description against its behaviour. `add` no longer declares an `outputSchema` but still returns `structuredContent`

### Added

- **license:** add MIT license file and declare it in `package.json`
- **privacy:** add `PRIVACY.md` privacy policy template for servers published to directories
- **readme:** add M8ven verification badge
- **http:** add optional bearer-token authentication via `MCP_AUTH_TOKEN` (constant-time comparison, `401` with `WWW-Authenticate` on failure) and warn when serving on a non-loopback address without it
- **http:** add per-client in-memory rate limiting (`RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS`; `429` with `Retry-After` when exceeded)
- **ci:** add GitHub Actions workflow running install, typecheck, build, tests and a production dependency audit on Node 20 and 22
- **docs:** document HTTP security and rate limit configuration in the README

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
