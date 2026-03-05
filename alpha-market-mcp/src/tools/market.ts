import { apifyClient } from "../lib/clients.js";

export async function runApifyScraper(url: string, extractRules?: string) {
    const pageFunction = extractRules
        ? "async ({ $, request }) => { " + extractRules + " }"
        : "async ({ $, request }) => { return { title: $('title').text(), text: $('body').text().substring(0, 5000) }; }";

    try {
        const run = await apifyClient.actor("apify/cheerio-scraper").call({
            startUrls: [{ url }],
            pageFunction: pageFunction,
        });
        const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
        return { content: [{ type: "text", text: JSON.stringify(items, null, 2) }] };
    } catch (error: any) {
        return { isError: true, content: [{ type: "text", text: "Error running scraper: " + error.message }] };
    }
}

export async function getMarketNews(query: string) {
    try {
        const run = await apifyClient.actor("apify/google-search-scraper").call({
            queries: query + " news",
            resultsPerPage: 5,
            maxPagesPerQuery: 1,
        });
        const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
        if (!items || items.length === 0) {
            return { content: [{ type: "text", text: "No results found for news query." }] };
        }
        const organicResults = (items[0] as any)?.organicResults || [];
        if (organicResults.length === 0) {
            return { content: [{ type: "text", text: "No organic news results found." }] };
        }
        return {
            content: [{
                type: "text",
                text: JSON.stringify(organicResults.map((i: any) => ({
                    title: i.title,
                    url: i.url,
                    description: i.description
                })), null, 2)
            }]
        };
    } catch (error: any) {
        return { isError: true, content: [{ type: "text", text: "Error fetching news: " + error.message }] };
    }
}
