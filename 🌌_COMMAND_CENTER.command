#!/bin/bash

# Display beautiful header
echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║                                                    ║"
echo "║        🌌  AURORA BOREALIS COMMAND CENTER  🌌      ║"
echo "║                                                    ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

PROJECT_DIR="/Users/angellatorre/Reddit Scrapper "
cd "$PROJECT_DIR" || exit 1

echo "⏳ Checking server status..."

# Check if already running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✅ Server already running!"
else
    echo "🚀 Starting Command Center server..."
    npm run dev > /tmp/command_center_dev.log 2>&1 &
    sleep 4
    echo "✅ Server initialized!"
fi

echo ""
echo "🌐 Opening Command Center in browser..."
open "http://localhost:3000"

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║   ✨ Command Center is ACTIVE! ✨                  ║"
echo "║                                                    ║"
echo "║   🔗 URL: http://localhost:3000                   ║"
echo "║   🎨 Aurora Mode: ENABLED                          ║"
echo "║                                                    ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

sleep 2
exit
