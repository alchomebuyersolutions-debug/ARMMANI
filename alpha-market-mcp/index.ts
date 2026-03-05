import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";

import { executeMT5Trade, executeBlofinTrade } from "./src/tools/trade.js";
import { saveTradeMemory, getTradeMemory } from "./src/tools/memory.js";
import { runApifyScraper, getMarketNews } from "./src/tools/market.js";
import { saveStrategy } from "./src/tools/strategy.js";

const server = new Server(
    { name: "alpha-market-mcp", version: "2.0.0" },
    { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "execute_mt5_trade",
                description: "Executes a trade on MT5 via MetaApi with risk management checks.",
                inputSchema: {
                    type: "object",
                    properties: {
                        symbol: { type: "string" },
                        action: { type: "string", enum: ["buy", "sell"] },
                        volume: { type: "number", description: "Lot size. Set to 0 for auto-calculation based on SL." },
                        sl: { type: "number", description: "Stop loss price" },
                        tp: { type: "number", description: "Take profit price" }
                    },
                    required: ["symbol", "action"]
                }
            },
            {
                name: "execute_blofin_trade",
                description: "Executes a crypto futures trade on Blofin Exchange.",
                inputSchema: {
                    type: "object",
                    properties: {
                        instId: { type: "string", description: "Instrument ID (e.g., BTC-USDT)" },
                        side: { type: "string", enum: ["buy", "sell"] },
                        orderType: { type: "string", default: "market" },
                        size: { type: "string", description: "Order size" }
                    },
                    required: ["instId", "side", "size"]
                }
            },
            {
                name: "save_trade_memory",
                description: "Saves trading insights, logs, or strategy data to Supabase.",
                inputSchema: {
                    type: "object",
                    properties: {
                        topic: { type: "string" },
                        data: { type: "string" }
                    },
                    required: ["topic", "data"]
                }
            },
            {
                name: "get_trade_memory",
                description: "Retrieves past trading data from Supabase memory.",
                inputSchema: {
                    type: "object",
                    properties: {
                        topic: { type: "string" }
                    },
                    required: ["topic"]
                }
            },
            {
                name: "get_market_news",
                description: "Fetches latest market news using Apify Google Search scraper.",
                inputSchema: {
                    type: "object",
                    properties: {
                        query: { type: "string" }
                    },
                    required: ["query"]
                }
            },
            {
                name: "run_scraper",
                description: "Runs a generic web scraper via Apify.",
                inputSchema: {
                    type: "object",
                    properties: {
                        url: { type: "string" },
                        extractRules: { type: "string", description: "Optional JS function body for extraction" }
                    },
                    required: ["url"]
                }
            },
            {
                name: "save_strategy",
                description: "Persists strategy code files (.pine, .py, .js, .ts).",
                inputSchema: {
                    type: "object",
                    properties: {
                        filename: { type: "string" },
                        content: { type: "string" }
                    },
                    required: ["filename", "content"]
                }
            }
        ]
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
        case "execute_mt5_trade":
            return await executeMT5Trade(args?.symbol as string, args?.action as string, args?.volume as number || 0, args?.sl as number || 0, args?.tp as number || 0);

        case "execute_blofin_trade":
            return await executeBlofinTrade(args?.instId as string, args?.side as string, args?.orderType as string || "market", args?.size as string);

        case "save_trade_memory":
            return await saveTradeMemory(args?.topic as string, args?.data as string);

        case "get_trade_memory":
            return await getTradeMemory(args?.topic as string);

        case "get_market_news":
            return await getMarketNews(args?.query as string);

        case "run_scraper":
            return await runApifyScraper(args?.url as string, args?.extractRules as string);

        case "save_strategy":
            return await saveStrategy(args?.filename as string, args?.content as string);

        default:
            throw new Error(`Tool not found: ${name}`);
    }
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Alpha Market MCP Server (v2.0.0) running on stdio");
}

main().catch(console.error);
