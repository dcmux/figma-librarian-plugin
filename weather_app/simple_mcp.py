#!/usr/bin/env python

"""
Simple MCP server using the official MCP SDK.
"""

import sys
import os
from mcp.server.fastmcp import FastMCP

# Create a FastMCP server
mcp = FastMCP("simple-weather")

@mcp.tool()
async def hello_world(name: str = "World") -> str:
    """Say hello to someone.
    
    Args:
        name: The name to say hello to
    """
    return f"Hello, {name}!"

if __name__ == "__main__":
    print("Starting simple MCP server...", file=sys.stderr)
    mcp.run(transport="stdio")
