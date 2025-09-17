#!/usr/bin/env python
"""Main entry point for the weather MCP server."""

from .weather import mcp

if __name__ == "__main__":
    # Use stdio transport for Claude desktop
    mcp.run(transport="stdio")
