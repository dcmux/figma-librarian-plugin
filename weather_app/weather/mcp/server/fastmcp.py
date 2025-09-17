from fastapi import FastAPI
from typing import Callable, Dict, Any, Literal, Optional
import inspect
import json
import sys
import asyncio

class FastMCP:
    def __init__(self, name: str, description: str = "", version: str = "1.0.0"):
        self.name = name
        self.description = description
        self.version = version
        self.app = FastAPI()
        self.tools = {}

        # MCP descriptor endpoint for Claude
        @self.app.get("/")
        async def descriptor():
            return {
                "name": self.name,
                "description": self.description,
                "version": self.version,
                "endpoints": list(self.tools.keys())
            }

    def tool(self):
        def decorator(func: Callable):
            endpoint = f"/{func.__name__}"
            self.tools[endpoint] = func

            # Inspect function args to auto-parse
            sig = inspect.signature(func)

            async def wrapper(**kwargs):
                args = {k: v for k, v in kwargs.items() if k in sig.parameters}
                result = await func(**args)
                return {"result": result}

            self.app.get(endpoint)(wrapper)
            return func
        return decorator

    def run(self, transport: Literal["http", "stdio"] = "http", host: str = "0.0.0.0", port: int = 3000):
        if transport == "http":
            import uvicorn
            uvicorn.run(self.app, host=host, port=port)
        elif transport == "stdio":
            asyncio.run(self._run_stdio())
        else:
            raise ValueError(f"Unsupported transport: {transport}")
            
    async def _run_stdio(self):
        """Run the MCP server using stdio transport."""
        print(f"Starting _run_stdio for {self.name}", file=sys.stderr)
        while True:
            try:
                # Read a line from stdin
                print("Waiting for input on stdin...", file=sys.stderr)
                line = sys.stdin.readline()
                if not line:
                    print("Empty line received, breaking loop", file=sys.stderr)
                    break
                
                print(f"Received line: {line}", file=sys.stderr)
                    
                # Parse the JSON request
                request = json.loads(line)
                print(f"Parsed request: {request}", file=sys.stderr)
                
                # Handle the request
                if request.get("method") == "list_tools":
                    response = {
                        "jsonrpc": "2.0",
                        "id": request.get("id"),
                        "result": {
                            "tools": [
                                {
                                    "name": func.__name__,
                                    "description": func.__doc__ or "",
                                    "parameters": self._get_parameters(func)
                                }
                                for func in self.tools.values()
                            ]
                        }
                    }
                elif request.get("method") == "call_tool":
                    tool_name = request.get("params", {}).get("name")
                    tool_args = request.get("params", {}).get("arguments", {})
                    
                    # Find the tool
                    tool_func = None
                    for func in self.tools.values():
                        if func.__name__ == tool_name:
                            tool_func = func
                            break
                    
                    if tool_func:
                        try:
                            result = await tool_func(**tool_args)
                            response = {
                                "jsonrpc": "2.0",
                                "id": request.get("id"),
                                "result": {"content": result}
                            }
                        except Exception as e:
                            response = {
                                "jsonrpc": "2.0",
                                "id": request.get("id"),
                                "error": {"code": -32000, "message": str(e)}
                            }
                    else:
                        response = {
                            "jsonrpc": "2.0",
                            "id": request.get("id"),
                            "error": {"code": -32601, "message": f"Tool not found: {tool_name}"}
                        }
                else:
                    response = {
                        "jsonrpc": "2.0",
                        "id": request.get("id"),
                        "error": {"code": -32601, "message": f"Method not supported: {request.get('method')}"}
                    }
                
                # Write the response to stdout
                sys.stdout.write(json.dumps(response) + "\n")
                sys.stdout.flush()
                
            except Exception as e:
                # Handle any errors
                error_response = {
                    "jsonrpc": "2.0",
                    "id": request.get("id") if "request" in locals() else None,
                    "error": {"code": -32000, "message": str(e)}
                }
                sys.stdout.write(json.dumps(error_response) + "\n")
                sys.stdout.flush()
                
    def _get_parameters(self, func: Callable) -> Dict[str, Any]:
        """Extract parameter information from a function."""
        sig = inspect.signature(func)
        params = {}
        
        for name, param in sig.parameters.items():
            param_type = param.annotation if param.annotation != inspect.Parameter.empty else None
            params[name] = {
                "type": str(param_type.__name__ if hasattr(param_type, "__name__") else param_type),
                "required": param.default == inspect.Parameter.empty
            }
            
        return params
