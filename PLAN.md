# PLAN.md — Master Ledger (Single Source of Truth)

> Last updated: 2026-02-23

---

## The Ecosystem

| Project | Location | Purpose | Status |
|---------|----------|---------|--------|
| Antigravity UI | `/Reddit Scrapper/app/` | Premium dark-mode web dashboard (Next.js) | Milestone 3 |
| Alpha Market MCP | `/Reddit Scrapper/alpha-market-mcp/` | Autonomous trading server (11 MCP tools) | Running |
| Gravity Claw Bot | `/gravity-claw/` | Personal AI agent on Telegram (grammY + Claude) | Running |
| Gravity Claw Web | `/gravity-claw/web/` | Browser chat UI for Gravity Claw | Running |

### How They Connect

```
Telegram (@Gravity_Claw_99bot)
  ↓ long-polling (grammY)
Gravity Claw Bot (ReAct agent loop + Claude)
  ↓ stdio MCP
Alpha Market MCP (11 tools: trading, memory, scraping)
  ↓
MetaApi MT5 / Supabase / Apify / Telegram API

TradingView Alerts
  ↓ webhook POST
Gravity Claw Web (/api/webhook/tradingview)
  ↓ stdio MCP
Alpha Market MCP → execute_mt5_trade
```

---

## Antigravity UI — Milestones

### Milestone 1: Core Interface ✅
- [x] Next.js + Tailwind scaffolding
- [x] Design system (globals.css tokens)
- [x] MCP Store feed & filtering
- [x] Sidebar navigation

### Milestone 2: Visual & Functional Healing ✅
- [x] Glassmorphism & premium UI pass
- [x] Mobile responsiveness
- [x] Toast notification system
- [x] Bug fixes (search grid, SVG paths)

### Milestone 3: Advanced Features 🏗️
- [x] LTA Book added to Trading Library section
- [x] Set up Alpha Bit within bot controls
- [x] Integrate dual Side-by-Side chat interfaces for Gravity Claw & Alpha Wik
- [ ] Connect Gravity Claw to the market data feed
- [ ] Finalize the MT5 VPS-to-MetaApi linkage

---

## Alpha Market MCP — Tools & Services

### 11 MCP Tools
| # | Tool | Purpose | Status |
|---|------|---------|--------|
| 1 | `save_trade_memory` | Store strategy rules to Supabase | ✅ |
| 2 | `get_trade_memory` | Retrieve past trades/strategies | ✅ |
| 3 | `run_apify_scraper` | Web scraping (Cheerio) | ✅ |
| 4 | `get_market_news` | Google news scraper | ✅ |
| 5 | `execute_mt5_trade` | Buy/sell on MetaTrader 5 | ✅ (needs live creds) |
| 6 | `analyze_telegram_signals` | Parse TG messages for signals | ✅ |
| 7 | `cf_create_strategy` | CopyFactory master strategy | ✅ |
| 8 | `cf_create_subscriber` | Create follower account | ✅ |
| 9 | `cf_create_webhook` | Signal webhooks | ✅ |
| 10 | `list_metaapi_accounts` | List linked trading accounts | ✅ |
| 11 | `cf_list_strategies` | List CopyFactory strategies | ✅ |

### Scheduled Jobs (worker.ts)
| Schedule | Task | Supabase Topic |
|----------|------|----------------|
| Every 5 min | Poll Telegram signals | `TELEGRAM_SIGNALS_POLL` |
| Every hour | Gold price news | `GOLD_MARKET_UPDATE` |
| Every hour | Forex USD news | `FOREX_USD_UPDATE` |
| Daily 9 AM | Bitcoin news | `BTC_MARKET_UPDATE` |
| Boot +10s | S&P 500 test scrape | `SP500_MARKET_UPDATE` |

### Risk Management (enforced)
- Max daily loss: $1,000
- Max total drawdown: $4,000
- Revenge trading cooldown: 60 min
- Auto lot-size: 0.5% risk rule
- News filter: placeholder (needs economic calendar API)

---

## Gravity Claw Bot — Levels

| Level | Feature | Status |
|-------|---------|--------|
| 1 | Telegram + Claude + ReAct agent loop | ✅ Done |
| 2 | SQLite memory + FTS5 search | ✅ Done |
| 3 | Whisper STT + OpenAI TTS | ✅ Done |
| 4 | MCP tool integrations (Alpha Market) | ✅ Done |
| 5 | Proactive heartbeat (cron) | ✅ Done |

---

## Comms

| Channel | Detail |
|---------|--------|
| Telegram Bot | @Gravity_Claw_99bot |
| User Chat ID | `7805537975` (@AlphaWik99) |
| Bot Token | Set in both `.env` files |
| Outbound messaging | ✅ Wired (sendMessage via API) |

---

## What's Next (Priority Order)

### Immediate
1. [x] Wire Alpha `send_telegram_message` as MCP tool #12
2. [x] Voice integration (Whisper STT + OpenAI TTS) — was already complete
3. [x] Heartbeat cron — was already complete, added schedule (9 AM weekdays)

### Short-term (Milestone 3)
4. [x] Algoway webhook integration (full Algoway JSON schema support + TG alerts)
5. [x] MT5 VPS confirmed — Algoway PRO active (expires 2026-03-26)
6. [ ] Link MT5 VPS to MetaApi → get real METAAPI_ACCOUNT_ID
7. [ ] MT5 account monitoring (equity, positions, P&L via Telegram)
8. [ ] Economic calendar API for news filter
9. [ ] Real-time analytics dashboard UI

### Long-term
10. [ ] CopyFactory signal distribution testing
11. [ ] Multi-account risk isolation
12. [x] Added TikTok, updated news feeds, added LTA Book to library (Milestone 2.5).

---

## Squad Assignments

| Agent | Territory | Current Task | Status |
|-------|-----------|-------------|--------|
| 🐎 Design Lead | /components, globals.css, pages | Analytics Dashboard UI | ⏸️ Waiting |
| 🏗️ Builder | /api, /lib, alpha-market-mcp | Telegram send tool + wallet | ⏸️ Waiting |
| 🤓 Nerd (QC) | /__tests__, audits | Deployment verification | ⏸️ Waiting |
| 📚 Researcher | PLAN.md, docs | This document | ✅ Done |

---

## Audit Log

| Date | Project | Score | Notes |
|------|---------|-------|-------|
| 2026-02-23 | Antigravity UI | 8.2/10 | Baseline — needed mobile/IA work |
| 2026-02-23 | Antigravity UI | 9.8/10 | Post-healing — **PASS** |
| 2026-02-20 | Gravity Claw | — | Levels 1-5 code complete |
| 2026-02-23 | Alpha MCP | — | 11 tools implemented, Telegram comms wired |

---

## Key Paths

```
/Users/angellatorre/Reddit Scrapper/           → Antigravity UI + Alpha MCP
/Users/angellatorre/Reddit Scrapper/alpha-market-mcp/  → Trading server
/Users/angellatorre/gravity-claw/              → Telegram bot
/Users/angellatorre/gravity-claw/web/          → Web chat UI
```
