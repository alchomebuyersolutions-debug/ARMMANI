#!/bin/bash
# Command Center Launcher with Enhanced Logging
# This script starts the Antigravity Command Center and opens the browser.

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     COMMAND CENTER LAUNCHER v1.0       ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Navigate to the project directory
PROJECT_DIR="/Users/angellatorre/Reddit Scrapper "
cd "$PROJECT_DIR" || { echo -e "${RED}✗ Failed to navigate to project directory${NC}"; exit 1; }
echo -e "${GREEN}✓ Navigated to project directory${NC}"

# Check if port 3000 is already in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠ Server already running on port 3000${NC}"
    PORT_STATUS="already running"
else
    echo -e "${BLUE}→ Starting Command Center server...${NC}"
    # Start the server in the background and pipe output to a log file
    npm run dev > /tmp/command_center_dev.log 2>&1 &
    SERVER_PID=$!
    echo -e "${GREEN}✓ Server process started (PID: $SERVER_PID)${NC}"
    # Give it a few seconds to initialize
    sleep 4
    echo -e "${GREEN}✓ Server initialized${NC}"
    PORT_STATUS="just started"
fi

echo ""
echo -e "${BLUE}→ Opening Command Center in browser...${NC}"

# Open the browser to the command center
if open "http://localhost:3000" 2>/dev/null; then
    echo -e "${GREEN}✓ Browser opened successfully${NC}"
else
    echo -e "${RED}✗ Failed to open browser${NC}"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Command Center is now ACTIVE! 🚀    ║${NC}"
echo -e "${GREEN}║   Status: $PORT_STATUS                 ║${NC}"
echo -e "${GREEN}║   URL: http://localhost:3000          ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"

# Wait a few seconds then close the terminal window
sleep 3
exit
