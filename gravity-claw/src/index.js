/**
 * 🦀 GRAVITY CLAW — 24/7 Telegram Trade Bot & Market Scraper
 * 
 * Free APIs only. No paid services.
 * - CoinGecko (crypto prices + trending)
 * - Yahoo Finance (stocks, futures, gold)
 * - Fear & Greed Index
 * - MarketWatch RSS (news headlines)
 * 
 * Telegram commands:
 *   /scan    — Full market scan
 *   /btc     — Bitcoin price
 *   /futures — NQ & S&P futures
 *   /gold    — Gold price
 *   /fear    — Fear & Greed Index
 *   /news    — Top market headlines
 *   /trending — Trending crypto
 *   /status  — Bot health check
 */

import cron from "node-cron";
import { TelegramBot } from "./telegram.js";
import {
    getCryptoPrices,
    getFearGreedIndex,
    getStockQuote,
    getMarketNews,
    getTrendingCrypto,
    fullMarketScan,
} from "./scraper.js";

// ─── Config ─────────────────────────────────────────
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("❌ Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in environment.");
    process.exit(1);
}

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);
let scanCount = 0;
const startTime = Date.now();

// ─── Format Helpers ─────────────────────────────────
function formatPrice(p) {
    if (!p) return "N/A";
    return typeof p === "number" ? `$${p.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : p;
}

function changeEmoji(change) {
    if (!change) return "⚪";
    const val = parseFloat(change);
    if (val > 2) return "🟢🟢";
    if (val > 0) return "🟢";
    if (val > -2) return "🔴";
    return "🔴🔴";
}

// ─── Command: /scan ─────────────────────────────────
bot.on("/scan", async () => {
    await bot.send("🔄 Running full market scan...");
    const data = await fullMarketScan();
    scanCount++;

    let msg = "🦀 <b>GRAVITY CLAW — MARKET SCAN</b>\n";
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    // Crypto
    if (data.crypto) {
        msg += "💰 <b>Crypto</b>\n";
        for (const [sym, info] of Object.entries(data.crypto)) {
            msg += `  ${changeEmoji(info.change24h)} ${sym}: ${formatPrice(info.price)} (${info.change24h || "?"}%)\n`;
        }
        msg += "\n";
    }

    // Fear & Greed
    if (data.fearGreed) {
        const fg = data.fearGreed;
        const emoji = fg.value > 60 ? "🟢" : fg.value > 40 ? "🟡" : "🔴";
        msg += `${emoji} <b>Fear & Greed:</b> ${fg.value}/100 (${fg.label})\n\n`;
    }

    // Futures
    if (data.nasdaq) {
        msg += `📊 <b>NQ Futures:</b> ${formatPrice(data.nasdaq.price)} (${data.nasdaq.change})\n`;
    }
    if (data.sp500) {
        msg += `📈 <b>S&P 500:</b> ${formatPrice(data.sp500.price)} (${data.sp500.change})\n`;
    }
    if (data.gold) {
        msg += `🥇 <b>Gold:</b> ${formatPrice(data.gold.price)} (${data.gold.change})\n`;
    }
    msg += "\n";

    // News
    if (data.news?.length) {
        msg += "📰 <b>Headlines</b>\n";
        data.news.slice(0, 3).forEach((title, i) => {
            msg += `  ${i + 1}. ${title}\n`;
        });
        msg += "\n";
    }

    // Trending
    if (data.trending?.length) {
        msg += "🔥 <b>Trending Crypto</b>\n";
        data.trending.forEach((c) => {
            msg += `  • ${c.name} (${c.symbol}) — Rank #${c.rank || "?"}\n`;
        });
    }

    msg += `\n⏱ Scan #${scanCount} at ${new Date().toLocaleTimeString()}`;
    await bot.send(msg);
});

// ─── Command: /btc ──────────────────────────────────
bot.on("/btc", async () => {
    const prices = await getCryptoPrices();
    if (!prices?.BTC) return bot.send("⚠️ Couldn't fetch BTC price.");
    await bot.send(
        `₿ <b>Bitcoin:</b> ${formatPrice(prices.BTC.price)}\n24h: ${changeEmoji(prices.BTC.change24h)} ${prices.BTC.change24h}%`
    );
});

// ─── Command: /futures ──────────────────────────────
bot.on("/futures", async () => {
    const [nq, sp] = await Promise.all([getStockQuote("NQ=F"), getStockQuote("^GSPC")]);
    let msg = "📊 <b>Futures</b>\n";
    msg += nq ? `  NQ: ${formatPrice(nq.price)} (${nq.change})\n` : "  NQ: unavailable\n";
    msg += sp ? `  S&P: ${formatPrice(sp.price)} (${sp.change})\n` : "  S&P: unavailable\n";
    await bot.send(msg);
});

// ─── Command: /gold ─────────────────────────────────
bot.on("/gold", async () => {
    const gold = await getStockQuote("GC=F");
    if (!gold) return bot.send("⚠️ Couldn't fetch gold price.");
    await bot.send(`🥇 <b>Gold:</b> ${formatPrice(gold.price)} (${gold.change})`);
});

// ─── Command: /fear ─────────────────────────────────
bot.on("/fear", async () => {
    const fg = await getFearGreedIndex();
    if (!fg) return bot.send("⚠️ Couldn't fetch Fear & Greed.");
    const emoji = fg.value > 60 ? "🟢 Greedy" : fg.value > 40 ? "🟡 Neutral" : "🔴 Fearful";
    await bot.send(`😱 <b>Fear & Greed Index:</b> ${fg.value}/100\n${emoji} — ${fg.label}`);
});

// ─── Command: /news ─────────────────────────────────
bot.on("/news", async () => {
    const news = await getMarketNews();
    if (!news?.length) return bot.send("⚠️ No headlines right now.");
    let msg = "📰 <b>Market Headlines</b>\n\n";
    news.forEach((title, i) => {
        msg += `${i + 1}. ${title}\n`;
    });
    await bot.send(msg);
});

// ─── Command: /trending ─────────────────────────────
bot.on("/trending", async () => {
    const trending = await getTrendingCrypto();
    if (!trending?.length) return bot.send("⚠️ No trending data.");
    let msg = "🔥 <b>Trending Crypto</b>\n\n";
    trending.forEach((c) => {
        msg += `• ${c.name} (${c.symbol}) — Rank #${c.rank || "?"}\n`;
    });
    await bot.send(msg);
});

// ─── Command: /status ───────────────────────────────
bot.on("/status", async () => {
    const uptime = Math.floor((Date.now() - startTime) / 1000);
    const hrs = Math.floor(uptime / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const secs = uptime % 60;
    await bot.send(
        `🦀 <b>Gravity Claw Status</b>\n\n` +
        `✅ Online\n` +
        `⏱ Uptime: ${hrs}h ${mins}m ${secs}s\n` +
        `📊 Scans completed: ${scanCount}\n` +
        `🕐 Server time: ${new Date().toLocaleString()}`
    );
});

// ─── Command: /start or /help ───────────────────────
const helpText =
    `🦀 <b>Gravity Claw — Command Center</b>\n\n` +
    `/scan — Full market scan\n` +
    `/btc — Bitcoin price\n` +
    `/futures — NQ & S&P futures\n` +
    `/gold — Gold price\n` +
    `/fear — Fear & Greed Index\n` +
    `/news — Top market headlines\n` +
    `/trending — Trending crypto\n` +
    `/status — Bot health check\n\n` +
    `📡 Auto-scans run every hour 24/7.`;

bot.on("/start", async () => bot.send(helpText));
bot.on("/help", async () => bot.send(helpText));

// ─── 24/7 CRON JOBS ─────────────────────────────────

// Hourly market scan — auto-send to chat
cron.schedule("0 * * * *", async () => {
    console.log("[CRON] Hourly market scan...");
    scanCount++;
    const data = await fullMarketScan();

    let msg = "📡 <b>HOURLY AUTO-SCAN</b>\n━━━━━━━━━━━━━━━━━━━━━━\n\n";

    if (data.crypto) {
        for (const [sym, info] of Object.entries(data.crypto)) {
            msg += `${changeEmoji(info.change24h)} ${sym}: ${formatPrice(info.price)} (${info.change24h}%)\n`;
        }
    }
    if (data.fearGreed) {
        msg += `\n😱 Fear & Greed: ${data.fearGreed.value}/100 (${data.fearGreed.label})\n`;
    }
    if (data.nasdaq) {
        msg += `📊 NQ: ${formatPrice(data.nasdaq.price)} (${data.nasdaq.change})\n`;
    }
    if (data.gold) {
        msg += `🥇 Gold: ${formatPrice(data.gold.price)} (${data.gold.change})\n`;
    }
    msg += `\n⏱ ${new Date().toLocaleTimeString()}`;
    await bot.send(msg);
});

// Morning briefing — 9:00 AM daily
cron.schedule("0 9 * * *", async () => {
    console.log("[CRON] Morning briefing...");
    const data = await fullMarketScan();
    let msg = "☀️ <b>MORNING BRIEFING</b>\n━━━━━━━━━━━━━━━━━━━━━━\n\n";

    if (data.crypto) {
        msg += "💰 <b>Crypto</b>\n";
        for (const [sym, info] of Object.entries(data.crypto)) {
            msg += `  ${changeEmoji(info.change24h)} ${sym}: ${formatPrice(info.price)} (${info.change24h}%)\n`;
        }
        msg += "\n";
    }

    if (data.fearGreed) {
        msg += `😱 Fear & Greed: ${data.fearGreed.value}/100 (${data.fearGreed.label})\n\n`;
    }

    if (data.nasdaq) msg += `📊 NQ Futures: ${formatPrice(data.nasdaq.price)} (${data.nasdaq.change})\n`;
    if (data.sp500) msg += `📈 S&P 500: ${formatPrice(data.sp500.price)} (${data.sp500.change})\n`;
    if (data.gold) msg += `🥇 Gold: ${formatPrice(data.gold.price)} (${data.gold.change})\n\n`;

    if (data.news?.length) {
        msg += "📰 <b>Top Headlines</b>\n";
        data.news.slice(0, 5).forEach((t, i) => { msg += `  ${i + 1}. ${t}\n`; });
        msg += "\n";
    }

    if (data.trending?.length) {
        msg += "🔥 <b>Trending</b>\n";
        data.trending.forEach((c) => { msg += `  • ${c.name} (${c.symbol})\n`; });
    }

    msg += `\n🦀 Gravity Claw — Stay sharp.`;
    await bot.send(msg);
});

// ─── Graceful Shutdown ──────────────────────────────
process.on("SIGTERM", () => {
    console.log("🦀 Gravity Claw shutting down...");
    process.exit(0);
});

process.on("SIGINT", () => {
    console.log("🦀 Gravity Claw interrupted.");
    process.exit(0);
});

// ─── Launch ─────────────────────────────────────────
console.log("🦀 ═══════════════════════════════════════");
console.log("🦀  GRAVITY CLAW v1.0 — 24/7 MODE");
console.log("🦀  Free APIs | Telegram | Market Scraper");
console.log("🦀 ═══════════════════════════════════════");

await bot.send("🦀 <b>Gravity Claw ONLINE</b>\n\nBot is live and scanning 24/7.\nType /help for commands.");
bot.startPolling();
