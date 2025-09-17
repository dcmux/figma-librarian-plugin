import httpx

ALPHA_VANTAGE_API = "https://www.alphavantage.co/query"
API_KEY = "your_api_key_here"

async def fetch_stock_data(symbol: str):
    """Fetch stock data from Alpha Vantage API"""
    url = f"{ALPHA_VANTAGE_API}?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval=5min&apikey={API_KEY}"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.json()