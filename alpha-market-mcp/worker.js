import { ApifyClient } from "apify-client";
import { createClient } from "@supabase/supabase-js";
import cron from "node-cron";
import dotenv from "dotenv";
dotenv.config();
const APIFY_TOKEN = process.env.APIFY_API_TOKEN;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!APIFY_TOKEN || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing environment variables. Worker requires APIFY_API_TOKEN, SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
}
const apifyClient = new ApifyClient({ token: APIFY_TOKEN });
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
/**
 * Scrape market news and save to Supabase.
 */
async function scrapeMarketNews(query, memoryTopic) {
    console.log(`[Worker] Starting scrape for query: "${query}"`);
    try {
        const run = await apifyClient.actor("apify/google-search-scraper").call({
            queries: `${query} news`,
            resultsPerPage: 5,
            maxPagesPerQuery: 1,
        });
        const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
        const organicResults = items[0]?.organicResults || [];
        const cleanData = organicResults.map((i) => ({
            title: i.title,
            url: i.url,
            description: i.description
        }));
        const dataString = JSON.stringify(cleanData);
        const { error } = await supabase
            .from("alpha_memory")
            .insert([{
                topic: memoryTopic,
                data: dataString,
                created_at: new Date().toISOString()
            }]);
        if (error) {
            console.error(`[Worker] Failed to save to Supabase: ${error.message}`);
        }
        else {
            console.log(`[Worker] Successfully saved ${cleanData.length} items to memory under topic '${memoryTopic}'.`);
        }
    }
    catch (error) {
        console.error(`[Worker] Scraper Error for ${query}:`, error.message);
    }
}
// Schedule tasks
async function pollTelegramSignals() {
    console.log("[Worker] Checking Telegram for signals...");
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken)
        return;
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
        const data = await response.json();
        if (data.ok && data.result.length > 0) {
            const signals = data.result
                .filter((u) => u.message && u.message.text)
                .map((u) => ({
                chatId: u.message.chat.id,
                text: u.message.text,
                from: u.message.from.first_name,
                date: u.message.date
            }));
            if (signals.length > 0) {
                const { error } = await supabase
                    .from("alpha_memory")
                    .insert([{
                        topic: "TELEGRAM_SIGNALS_POLL",
                        data: JSON.stringify(signals),
                        created_at: new Date().toISOString()
                    }]);
                if (!error) {
                    console.log(`[Worker] Saved ${signals.length} Telegram signals to memory.`);
                }
            }
        }
    }
    catch (error) {
        console.error("[Worker] Telegram Poll Error:", error.message);
    }
}
console.log("🚀 Alpha Market 24/7 Worker started.");
// Run Telegram poll every 5 minutes
cron.schedule("*/5 * * * *", () => {
    pollTelegramSignals();
});
// Run the Gold/Forex news scraper every hour at minute 0
cron.schedule("0 * * * *", () => {
    console.log("[CRON] Running hourly market news scrape...");
    scrapeMarketNews("Gold price", "GOLD_MARKET_UPDATE");
    scrapeMarketNews("Forex USD", "FOREX_USD_UPDATE");
});
// Run a daily crypto update at 9:00 AM (server time)
cron.schedule("0 9 * * *", () => {
    console.log("[CRON] Running daily crypto news scrape...");
    scrapeMarketNews("Bitcoin price", "BTC_MARKET_UPDATE");
});
// For immediate testing, we'll trigger one run right away, 10 seconds after boot
setTimeout(() => {
    console.log("[Init] Running initial test scrape...");
    scrapeMarketNews("S&P 500", "SP500_MARKET_UPDATE");
    pollTelegramSignals();
}, 10000);
//# sourceMappingURL=worker.js.map