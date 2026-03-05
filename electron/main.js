const { app, BrowserWindow, shell } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const http = require("http");

let mainWindow = null;
let nextServer = null;
const PORT = 3000;

// ─── Wait for Next.js to be ready ──────────────────────────────────────────
function waitForServer(url, timeout = 30000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const check = () => {
            http.get(url, (res) => {
                if (res.statusCode < 500) return resolve();
                retry();
            }).on("error", retry);
        };
        const retry = () => {
            if (Date.now() - start > timeout) return reject(new Error("Server timed out"));
            setTimeout(check, 500);
        };
        check();
    });
}

// ─── Start Next.js server ──────────────────────────────────────────────────
function startNextServer() {
    const projectRoot = path.join(__dirname, "..");
    // Use 'next start' in production, 'next dev' in dev
    const isDev = !app.isPackaged;
    const cmd = isDev ? "npx" : "npx";
    const args = isDev ? ["next", "dev"] : ["next", "start"];

    nextServer = spawn(cmd, args, {
        cwd: projectRoot,
        env: { ...process.env, PORT: String(PORT) },
        shell: true,
        stdio: "pipe",
    });

    nextServer.stdout.on("data", (d) => process.stdout.write(d));
    nextServer.stderr.on("data", (d) => process.stderr.write(d));

    nextServer.on("error", (err) => console.error("Next.js error:", err));
}

// ─── Create the BrowserWindow ──────────────────────────────────────────────
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1440,
        height: 900,
        minWidth: 1024,
        minHeight: 700,
        backgroundColor: "#0a0a0f",
        titleBarStyle: "hiddenInset",   // macOS: traffic lights, no title
        trafficLightPosition: { x: 16, y: 16 },
        title: "Command Center",
        icon: path.join(__dirname, "..", "public", "favicon.ico"),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        show: false, // Show only when ready — no white flash
    });

    mainWindow.loadURL(`http://localhost:${PORT}`);

    // Open external links in the default browser, not Electron
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: "deny" };
    });

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

// ─── App lifecycle ─────────────────────────────────────────────────────────
app.whenReady().then(async () => {
    startNextServer();

    console.log("⏳ Waiting for Command Center server...");
    try {
        await waitForServer(`http://localhost:${PORT}`);
        console.log("✅ Server ready — launching window");
        createWindow();
    } catch (err) {
        console.error("❌ Server failed to start:", err.message);
        app.quit();
    }

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    // Kill Next.js server
    if (nextServer) {
        nextServer.kill("SIGTERM");
        nextServer = null;
    }
    if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
    if (nextServer) {
        nextServer.kill("SIGTERM");
    }
});
