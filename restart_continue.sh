#!/bin/bash

echo "💥 Killing any leftover Continue, Python, or Node processes..."
pkill -f continue
pkill -f python
pkill -f node

sleep 1

echo "🧠 Checking if your LLM is running on port 1234..."
if curl -s http://127.0.0.1:1234/v1/models > /dev/null; then
  echo "✅ Local model is already running!"
else
  echo "🚀 Starting LM Studio..."
  open -a "LM Studio"
  echo "⏳ Waiting 5 seconds for the model to start..."
  sleep 5
fi

echo "💻 Launching Cursor..."
open -a "Cursor"

echo "🎉 All done! You should be good to go."