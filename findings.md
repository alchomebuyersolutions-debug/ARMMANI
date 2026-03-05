# findings.md — Research & Discoveries

## Stack
- Next.js 16.1.6, React 19, Tailwind v4, Framer Motion, Lucide
- Package manager: bun (bun.lock present) — but npm scripts work
- Spline 3D scene integrated on homepage

## Constraints
- `"ignoreScripts": ["sharp", "unrs-resolver"]` — these native modules are excluded
- No Apple Developer cert → app won't be notarized; Gatekeeper will prompt on first run (right-click → Open)
- Electron builder targets `mac` arm64 by default on M-series Macs

## Electron Strategy
- Main process (`electron/main.js`): spawn `next start` as child_process, poll until ready, show window
- `wait-on` used to detect server readiness before window opens
- `electron-builder` for packaging into `.app` / `.dmg`

## Bot Wiring (discovered)
- Gravity Claw: real API at `/api/gravity-claw` (start/stop)
- Alpha Wik, Alpha Bit, Telegram Bot: UI-local state only (no backend process yet)
- All 4 wired into unified Launch Bar + Algorithm Controls section

## Security Findings (from audit)
- MetaAPI JWT was hardcoded in 3 files → FIXED
- .gitignore created at scratch root
- Secrets still need rotation (user action required)
