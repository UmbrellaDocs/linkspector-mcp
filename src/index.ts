#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const server = new McpServer({
  name: "linkspector",
  version: "0.1.0",
});

server.registerTool(
  "check_links",
  {
    description:
      "Check for broken hyperlinks in Markdown and AsciiDoc files. " +
      "Runs linkspector in the specified directory and returns broken links " +
      "with file paths, line numbers, URLs, and HTTP status codes.",
    inputSchema: {
      directory: z
        .string()
        .optional()
        .describe(
          "Directory to check for broken links. Defaults to current working directory."
        ),
      config: z
        .string()
        .optional()
        .describe(
          "Path to a custom .linkspector.yml configuration file."
        ),
    },
  },
  async ({ directory, config }) => {
    const args = ["@umbrelladocs/linkspector", "check", "-j"];

    if (config) {
      args.push("-c", config);
    }

    const options: { cwd?: string; timeout: number } = {
      timeout: 300_000,
    };

    if (directory) {
      options.cwd = directory;
    }

    try {
      const { stdout } = await execFileAsync("npx", ["-y", ...args], options);
      return {
        content: [
          {
            type: "text" as const,
            text: stdout || "All links are valid. No broken links found.",
          },
        ],
      };
    } catch (error) {
      const execError = error as {
        stdout?: string;
        stderr?: string;
        code?: number;
      };

      // linkspector exits non-zero when broken links are found — that's expected
      if (execError.stdout) {
        return {
          content: [
            {
              type: "text" as const,
              text: execError.stdout,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: `Error running linkspector: ${execError.stderr || String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "check_links_summary",
  {
    description:
      "Quick check for broken links returning only pass/fail status and statistics. " +
      "Faster to process than full results.",
    inputSchema: {
      directory: z
        .string()
        .optional()
        .describe(
          "Directory to check for broken links. Defaults to current working directory."
        ),
      config: z
        .string()
        .optional()
        .describe(
          "Path to a custom .linkspector.yml configuration file."
        ),
    },
  },
  async ({ directory, config }) => {
    const args = ["@umbrelladocs/linkspector", "check", "-q", "-s"];

    if (config) {
      args.push("-c", config);
    }

    const options: { cwd?: string; timeout: number } = {
      timeout: 300_000,
    };

    if (directory) {
      options.cwd = directory;
    }

    try {
      const { stdout } = await execFileAsync("npx", ["-y", ...args], options);
      return {
        content: [
          {
            type: "text" as const,
            text: stdout || "All links are valid.",
          },
        ],
      };
    } catch (error) {
      const execError = error as {
        stdout?: string;
        stderr?: string;
        code?: number;
      };

      if (execError.stdout) {
        return {
          content: [
            {
              type: "text" as const,
              text: execError.stdout,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: `Error running linkspector: ${execError.stderr || String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Linkspector MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
