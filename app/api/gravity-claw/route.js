import { NextResponse } from "next/server";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const BOT_DIR = "/Users/angellatorre/gravity-claw";
const PID_FILE = path.join(BOT_DIR, "data", ".bot-pid");

function readPid() {
  try {
    if (!fs.existsSync(PID_FILE)) return null;
    const pid = parseInt(fs.readFileSync(PID_FILE, "utf8").trim(), 10);
    return isNaN(pid) ? null : pid;
  } catch {
    return null;
  }
}

function writePid(pid) {
  const dir = path.dirname(PID_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(PID_FILE, String(pid));
}

function clearPid() {
  try {
    if (fs.existsSync(PID_FILE)) fs.unlinkSync(PID_FILE);
  } catch {
    // ignore
  }
}

function isProcessRunning(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0); // signal 0 = just check if alive
    return true;
  } catch {
    return false;
  }
}

// GET — check if bot is running
export async function GET() {
  const pid = readPid();
  const running = isProcessRunning(pid);
  if (!running && pid) clearPid();
  return NextResponse.json({ running, pid: running ? pid : null });
}

// POST — start or stop the bot
export async function POST(request) {
  try {
    const { action } = await request.json();

    if (action === "start") {
      // Check if already running
      const existingPid = readPid();
      if (isProcessRunning(existingPid)) {
        return NextResponse.json({ running: true, pid: existingPid, message: "Already running" });
      }

      // Check dist exists
      const entryPoint = path.join(BOT_DIR, "dist", "index.js");
      if (!fs.existsSync(entryPoint)) {
        return NextResponse.json(
          { error: "Bot not built. Run 'npm run build' in gravity-claw first." },
          { status: 500 }
        );
      }

      // Load bot .env into child process environment
      const botEnv = { ...process.env, NODE_ENV: "production" };
      const envPath = path.join(BOT_DIR, ".env");
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, "utf8");
        for (const line of envContent.split("\n")) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const eqIdx = trimmed.indexOf("=");
          if (eqIdx > 0) {
            botEnv[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
          }
        }
      }

      // Spawn detached process
      const logFile = path.join(BOT_DIR, "data", "bot.log");
      const logDir = path.dirname(logFile);
      if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
      const out = fs.openSync(logFile, "a");
      const err = fs.openSync(logFile, "a");

      const child = spawn("node", [entryPoint], {
        cwd: BOT_DIR,
        detached: true,
        stdio: ["ignore", out, err],
        env: botEnv,
      });

      child.unref();
      writePid(child.pid);

      return NextResponse.json({ running: true, pid: child.pid, message: "Bot started" });
    }

    if (action === "stop") {
      const pid = readPid();
      if (!pid || !isProcessRunning(pid)) {
        clearPid();
        return NextResponse.json({ running: false, message: "Bot is not running" });
      }

      // Graceful shutdown via SIGTERM (bot handles this)
      process.kill(pid, "SIGTERM");
      clearPid();

      return NextResponse.json({ running: false, message: "Bot stopped" });
    }

    return NextResponse.json({ error: "Invalid action. Use 'start' or 'stop'." }, { status: 400 });
  } catch (error) {
    console.error("Gravity Claw API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
