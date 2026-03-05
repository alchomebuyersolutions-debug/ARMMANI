# SOP: Electron Desktop App Shell
**Layer 1 — Architecture**
**B.L.A.S.T. Phase: Architect**

---

## Goal
Wrap the Command Center Next.js app in an Electron shell to produce a native macOS `.app`.

## Inputs
- Next.js app at project root
- `electron/main.js` — main process entry
- `.env` — credentials (never committed)
- `electron-builder.config.js` — packaging config

## Tool Logic (`electron/main.js`)

### Step 1: Boot
```
app.whenReady() →
  startNextServer() → spawn("npx", ["next", "dev"|"start"])
  waitForServer("http://localhost:3000") → poll every 500ms, timeout 30s
```

### Step 2: Show Window
```
waitForServer resolves →
  createWindow() →
    new BrowserWindow({ show: false, titleBarStyle: "hiddenInset" })
    loadURL("http://localhost:3000")
    once("ready-to-show") → show()
```

### Step 3: Teardown
```
window-all-closed →
  nextServer.kill("SIGTERM")
  app.quit() [non-darwin]
```

## Edge Cases

| Scenario | Behavior |
|---|---|
| Port 3000 already in use | Next.js fails, Electron logs error + quits |
| Server takes > 30s | `waitForServer` rejects → `app.quit()` |
| External link click | `shell.openExternal()` → opens in browser, not Electron |
| App re-activated (macOS dock click) | Re-creates window if none open |

## Environment Rules
- `app.isPackaged` = false → uses `next dev`
- `app.isPackaged` = true → uses `next start` (requires `npm run build` first)

## Invariants (from gemini.md)
- Port 3000 is reserved
- Window close = server kill
- No trading logic in Electron layer
