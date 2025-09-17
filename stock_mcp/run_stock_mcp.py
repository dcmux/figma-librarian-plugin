import openai
import httpx

openai.api_key = "your_openai_api_key"
MCP_SERVER_URL = "http://localhost:8000/get_stock_price"

def ask_mcp_stock(symbol):
    """Fetch stock price from MCP Server"""
    response = httpx.get(f"{MCP_SERVER_URL}?symbol={symbol}")
    return response.json()

def ask_ai_for_insights(symbol):
    """Send stock data to an LLM for analysis"""
    stock_data = ask_mcp_stock(symbol)
    prompt = f"Analyze this stock data and provide investment insights: {stock_data}"
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response["choices"][0]["message"]["content"]

if __name__ == "__main__":
    print(ask_ai_for_insights("AAPL"))