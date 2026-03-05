# 🌌 Command Center — Project Constitution (gemini.md)

## Identity
**App:** Trading Command Center (Electron + Next.js)
**Pilot:** Antigravity System Pilot — B.L.A.S.T. Protocol

---

## Data Schema

### Bot State
```ts
type BotState = {
  name: "Gravity Claw" | "Alpha Wik" | "Alpha Bit" | "Telegram Bot";
  active: boolean;
  status: "online" | "offline" | "loading";
}
```

### Integration State
```ts
type Integration = {
  platform: "mt5" | "blofin" | "telegram" | "discord" | "youtube" | "twitter" | "reddit" | "instagram" | "twitch" | "meta" | "tiktok" | "customWebhook";
  connected: boolean;
}
```

### API Contracts
- `GET /api/gravity-claw` → `{ running: boolean }`
- `POST /api/gravity-claw` body: `{ action: "start" | "stop" }` → `{ running: boolean }`
- `GET /api/integrations` → `Record<platform, boolean>`
- `POST /api/integrations` body: `{ platform: string, connected: boolean }`

---

## Architectural Invariants

1. **Secrets never in source** — all tokens via `process.env` only
2. **Bot state is UI-local** — persisted to `/api/integrations` on change
3. **Electron is a shell** — it only spawns Next.js and opens a BrowserWindow; no trading logic lives in the Electron layer
4. **Port 3000 is reserved** — Electron always targets localhost:3000
5. **Window close = server kill** — no orphan Node processes allowed

---

## Behavioral Rules

- All bot toggles must update both the command bar pill AND the Algorithm Controls card (single source of state)
- `launchAllBots` / `killAllBots` must be atomic — all bots on or all bots off
- Electron `main.js` must wait for Next.js to be ready before showing the window (no white flash)
- Security: `.env` is always in `.gitignore`
