# Linkspector MCP Server

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that exposes [Linkspector](https://github.com/UmbrellaDocs/linkspector) as a tool for AI agents. Check for broken hyperlinks in Markdown and AsciiDoc files directly from Claude, Cursor, VS Code Copilot, and other MCP-compatible clients.

## Tools

### `check_links`

Check for broken hyperlinks and get detailed results in RDJSON format with file paths, line numbers, URLs, and HTTP status codes.

**Parameters:**
- `directory` (optional) — Directory to check. Defaults to current working directory.
- `config` (optional) — Path to a custom `.linkspector.yml` configuration file.

### `check_links_summary`

Quick pass/fail check with statistics. Faster to process than full results.

**Parameters:**
- `directory` (optional) — Directory to check. Defaults to current working directory.
- `config` (optional) — Path to a custom `.linkspector.yml` configuration file.

## Installation

```bash
npm install -g @umbrelladocs/linkspector-mcp
```

## Configuration

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "linkspector": {
      "command": "linkspector-mcp"
    }
  }
}
```

### Claude Code

```bash
claude mcp add linkspector -- linkspector-mcp
```

### VS Code / Cursor

Add to your MCP settings:

```json
{
  "mcpServers": {
    "linkspector": {
      "command": "linkspector-mcp"
    }
  }
}
```

## Development

```bash
npm install
npm run build
```

## License

Apache-2.0
