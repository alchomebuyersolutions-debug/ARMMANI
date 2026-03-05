import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function runDryRunTest(chatId: string) {
    console.log(`\n🚀 Starting Dry Run Test for Chat: ${chatId}\n`);

    // 1. Test Telegram Fetching & Parsing
    console.log("Step 1: Fetching signals from Telegram...");
    try {
        const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
        const data = response.data;

        if (data.ok) {
            console.log(`✅ Telegram Connection: OK (${data.result.length} updates found)`);

            // Fetch all messages (Discovery Mode)
            const messages = data.result
                .filter((u: any) => u.message && u.message.text)
                .map((u: any) => ({
                    text: u.message.text,
                    from: u.message.from.first_name,
                    chatId: u.message.chat.id
                }));

            if (messages.length === 0) {
                console.log("⚠️ No recent messages found in getUpdates.");
                console.log("Tip: Send a message to your bot right now and run this again.");
            } else {
                console.log(`✅ Found ${messages.length} messages in recent history.`);
                messages.forEach((msg: any, i: number) => {
                    const parsed = parseSignal(msg.text || "");
                    console.log(`\n   [${i + 1}] (ChatID: ${msg.chatId}) From ${msg.from}: "${msg.text}"`);
                    console.log(`      MATCHED SYMBOL: ${parsed.symbol || "???"}`);
                    console.log(`      ACTION:         ${parsed.action || "???"}`);
                    console.log(`      STOP LOSS:      ${parsed.sl || "none"}`);
                    console.log(`      TAKE PROFIT:    ${parsed.tp || "none"}`);
                });
            }
        } else {
            console.error("❌ Telegram Error:", data.description);
        }
    } catch (error: any) {
        console.error("❌ Fetch Error:", error.message);
    }

    // 2. Test Risk Engine Simulation
    console.log("\nStep 2: Simulating Risk Engine...");
    const ACCOUNT_SIZE = Number(process.env.ACCOUNT_SIZE) || 50000;
    const MAX_TOTAL_DRAWDOWN = Number(process.env.MAX_TOTAL_DRAWDOWN) || 4000;

    // Simulate a $500 loss (as mention in MEMORY.md)
    const currentEquity = ACCOUNT_SIZE - 500;
    const totalLoss = ACCOUNT_SIZE - currentEquity;

    console.log(`   Current Equity: $${currentEquity}`);
    console.log(`   Total Loss: $${totalLoss}`);
    console.log(`   Drawdown Limit: $${MAX_TOTAL_DRAWDOWN}`);

    if (totalLoss >= MAX_TOTAL_DRAWDOWN) {
        console.log("❌ RISK STATUS: BREACHED (Trading Disabled)");
    } else {
        console.log("✅ RISK STATUS: CLEAR (Safe to Trade)");
    }

    console.log("\nDry Run Complete. System is standing by. 🦀");
}

function parseSignal(text: string) {
    const lines = text.toUpperCase().split('\n');
    let symbol = "";
    let action = "";
    let sl = 0;
    let tp = 0;

    const pairs = ["XAUUSD", "GOLD", "EURUSD", "GBPUSD", "US30", "NAS100", "BTCUSD"];

    for (const line of lines) {
        for (const p of pairs) {
            if (line.includes(p)) symbol = p === "GOLD" ? "XAUUSD" : p;
        }
        if (line.includes("BUY") || line.includes("LONG")) action = "buy";
        if (line.includes("SELL") || line.includes("SHORT")) action = "sell";
        if (line.includes("SL") || line.includes("STOP")) {
            const match = line.match(/\d+(\.\d+)?/);
            if (match) sl = parseFloat(match[0]);
        }
        if (line.includes("TP") || line.includes("TARGET") || line.includes("PROFIT")) {
            const match = line.match(/\d+(\.\d+)?/);
            if (match) tp = parseFloat(match[0]);
        }
    }
    return { symbol, action, sl, tp };
}

// Extract chatId from args or use a placeholder
const targetChat = process.argv[2] || "@your_test_group";
runDryRunTest(targetChat);
