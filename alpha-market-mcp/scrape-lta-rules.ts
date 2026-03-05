import { ApifyClient } from "apify-client";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '.env') });

const client = new ApifyClient({
    token: process.env.APIFY_API_TOKEN!,
});

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function scrapeLTARules() {
    console.log("🚀 Lil Bra is starting the LTA scrap mission...");

    // Lorenzo Corrado FX - LTA Concepts Video
    const videoUrls = [
        "https://www.youtube.com/watch?v=J_u_vVfFwF0", // Placeholder for a real LTA video if URL is found, otherwise search
    ];

    try {
        // Search for the latest LTA video first if no URL is provided
        console.log("🔍 Searching for the latest LTA War Map videos...");
        const searchRun = await client.actor("apify/google-search-scraper").call({
            queries: "site:youtube.com Lorenzo Corrado FX LTA Concepts War Map",
            resultsPerPage: 3,
            maxPagesPerQuery: 1,
        });

        const { items: searchItems } = await client.dataset(searchRun.defaultDatasetId).listItems();
        const urls = (searchItems[0] as any)?.organicResults?.map((r: any) => r.url) || videoUrls;

        console.log(`📡 Found ${urls.length} target videos. Scraping transcripts...`);

        for (const url of urls) {
            console.log(`📑 Scraping: ${url}`);
            const run = await client.actor("streamers/youtube-scraper").call({
                startUrls: [{ url }],
                maxComments: 0,
                downloadSubtitles: true,
                maxItems: 1
            });

            const { items: transcriptItems } = await client.dataset(run.defaultDatasetId).listItems();
            const transcript = transcriptItems.map((item: any) => item.text).join(" ");

            // Save raw transcript to memory for Alpha to digest
            const { error } = await supabase
                .from("alpha_memory")
                .insert([{
                    topic: "LTA_RAW_INTELLIGENCE",
                    data: JSON.stringify({
                        url: url,
                        transcript: transcript.substring(0, 10000) // Truncate for now
                    }),
                    created_at: new Date().toISOString()
                }]);

            if (error) {
                console.error(`❌ Failed to save transcript for ${url}:`, error.message);
            } else {
                console.log(`✅ Saved LTA intelligence for ${url} to long-term memory.`);
            }
        }

        console.log("🏁 LTA scrap mission complete. Alpha engine is now smarter.");

    } catch (error: any) {
        console.error("💥 Scrap mission failed:", error.message);
    }
}

scrapeLTARules();
