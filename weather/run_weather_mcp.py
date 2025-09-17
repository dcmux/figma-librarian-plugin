#!/usr/bin/env python

"""
Simple script to run the weather MCP server.
This script can be run directly with: python run_weather_mcp.py
"""

import sys
import os

# Print debug information
print("Starting weather MCP server...", file=sys.stderr)
print(f"Python version: {sys.version}", file=sys.stderr)
print(f"Current directory: {os.getcwd()}", file=sys.stderr)
print(f"Script path: {__file__}", file=sys.stderr)
print(f"System path: {sys.path}", file=sys.stderr)

# Import the MCP server
import weather

if __name__ == "__main__":
    # Use stdio transport for Claude desktop
    print("Running MCP server with stdio transport...", file=sys.stderr)
    weather.mcp.run(transport="stdio")
