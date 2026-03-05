/**
 * 🦀 Gravity Claw — Free Market Scraper Module
 * All free APIs. No paid services. Runs 24/7.
 */

// ─── CoinGecko (FREE, no API key) ───────────────────
export async function getCryptoPrices() {
    try {
        const res = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true"
        );
        const data = await res.json();
        return {
            BTC: { price: data.bitcoin?.usd, change24h: data.bitcoin?.usd_24h_change?.toFixed(2) },
            ETH: { price: data.ethereum?.usd, change24h: data.ethereum?.usd_24h_change?.toFixed(2) },
            SOL: { price: data.solana?.usd, change24h: data.solana?.usd_24h_change?.toFixed(2) },
        };
    } catch (err) {
        console.error("[Scraper] CoinGecko error:", err.message);
        return null;
    }
}

// ─── Fear & Greed Index (FREE, no API key) ──────────
export async function getFearGreedIndex() {
    try {
        const res = await fetch("https://api.alternative.me/fng/?limit=1");
        const data = await res.json();
        const item = data.data?.[0];
        return item ? { value: item.value, label: item.value_classification } : null;
    } catch (err) {
        console.error("[Scraper] Fear & Greed error:", err.message);
        return null;
    }
}

// ─── Yahoo Finance Quote (FREE, no API key) ─────────
export async function getStockQuote(symbol) {
    try {
        const res = await fetch(
            `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
            { headers: { "User-Agent": "Mozilla/5.0" } }
        );
        const data = await res.json();
        const meta = data.chart?.result?.[0]?.meta;
        if (!meta) return null;
        const change = (((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100).toFixed(2);
        return {
            symbol: meta.symbol,
            price: meta.regularMarketPrice,
            previousClose: meta.previousClose,
            change: `${change}%`,
        };
    } catch (err) {
        console.error(`[Scraper] Yahoo Finance error for ${symbol}:`, err.message);
        return null;
    }
}

// ─── Financial News via RSS (FREE) ──────────────────
export async function getMarketNews() {
    try {
        // MarketWatch RSS
        const res = await fetch("https://feeds.marketwatch.com/marketwatch/topstories/", {
            headers: { "User-Agent": "Mozilla/5.0" },
        });
        const xml = await res.text();
        // Simple XML parse for titles
        const titles = [];
        const regex = /<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/g;
        let match;
        while ((match = regex.exec(xml)) !== null && titles.length < 5) {
            const title = match[1] || match[2];
            if (title && title !== "MarketWatch Top Stories") {
                titles.push(title);
            }
        }
        return titles;
    } catch (err) {
        console.error("[Scraper] RSS error:", err.message);
        return [];
    }
}

// ─── CoinGecko Trending (FREE) ─────────────────────
export async function getTrendingCrypto() {
    try {
        const res = await fetch("https://api.coingecko.com/api/v3/search/trending");
        const data = await res.json();
        return (data.coins || []).slice(0, 5).map((c) => ({
            name: c.item.name,
            symbol: c.item.symbol,
            rank: c.item.market_cap_rank,
        }));
    } catch (err) {
        console.error("[Scraper] Trending error:", err.message);
        return [];
    }
}

// ─── Full Market Scan (composes all above) ──────────
export async function fullMarketScan() {
    const [crypto, fearGreed, sp500, nasdaq, gold, news, trending] = await Promise.all([
        getCryptoPrices(),
        getFearGreedIndex(),
        getStockQuote("^GSPC"),   // S&P 500
        getStockQuote("NQ=F"),    // NASDAQ futures (MNQ proxy)
        getStockQuote("GC=F"),    // Gold futures
        getMarketNews(),
        getTrendingCrypto(),
    ]);

    return { crypto, fearGreed, sp500, nasdaq, gold, news, trending, timestamp: new Date().toISOString() };
}
