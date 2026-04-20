[![GitHub Marketplace](https://img.shields.io/badge/GitHub%20Marketplace-action%20linkspector-brightgreen?style=for-the-badge)](https://github.com/marketplace/actions/run-linkspector-with-reviewdog)
[![NPM](https://img.shields.io/npm/v/@umbrelladocs/linkspector?style=for-the-badge)](https://www.npmjs.com/package/@umbrelladocs/linkspector)
[![MCP](https://img.shields.io/badge/MCP%20Server-Linkspector_MCP-brightgreen?logo=modelcontextprotocol&style=for-the-badge)](https://github.com/UmbrellaDocs/linkspector-mcp)
<a href="https://liberapay.com/gaurav-nelson/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg"></a>

<p align="center">
  <a href="https://github.com/UmbrellaDocs/linkspector"><img src="https://i.ibb.co/VD70DX3/linkspectorelogonewtransparentupscale.png" alt="Logo" height=170></a>
</p>
<h3 align="center">Uncover broken links in your content.</h3>
<h1 align="center">Linkspector</h1>

Linkspector is a CLI tool that checks for dead hyperlinks in your files. It supports Markdown and AsciiDoc, with a rich interactive TUI for local use and clean output for CI/CD pipelines. Now, with the Linkspector MCP Server, you can integrate link checking directly into your AI agent workflows.

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
