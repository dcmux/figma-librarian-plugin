from mcp.server.fastmcp import FastMCP
from .stock_api import fetch_stock_data

mcp = FastMCP("stock_market")

@mcp.tool()
async def get_stock_price(symbol: str):
    """Returns the latest stock price for a given symbol."""
    data = await fetch_stock_data(symbol)
    return data

if __name__ == "__main__":
    mcp.run(transport="stdio")