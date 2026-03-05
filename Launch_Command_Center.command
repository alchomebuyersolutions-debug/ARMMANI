#!/bin/bash
# Command Center Launcher
# This script starts the Antigravity Command Center and opens the browser.

# Navigate to the project directory
PROJECT_DIR="/Users/angellatorre/Reddit Scrapper "
cd "$PROJECT_DIR" || exit

# Check if port 3000 is already in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "Command Center server is already running."
else
    echo "Starting Command Center server..."
    # Start the server in the background and pipe output to a log file
    npm run dev > /tmp/command_center_dev.log 2>&1 &
    # Give it a few seconds to initialize
    sleep 3
fi

# Open the browser to the command center
open "http://localhost:3000"

echo "Command Center launched successfully!"
# Wait a few seconds then close the terminal window
sleep 2
exit
