/**
 * 🦀 Gravity Claw — Telegram Bot Module
 * Handles sending/receiving messages via the Telegram Bot API.
 * No libraries needed — pure fetch.
 */

const API_BASE = "https://api.telegram.org/bot";

export class TelegramBot {
    constructor(token, chatId) {
        this.token = token;
        this.chatId = chatId;
        this.baseUrl = `${API_BASE}${token}`;
        this.lastUpdateId = 0;
        this.commandHandlers = new Map();
    }

    // Register a command handler: bot.on("/scan", async (msg) => { ... })
    on(command, handler) {
        this.commandHandlers.set(command.toLowerCase(), handler);
    }

    // Send a message to the configured chat
    async send(text, parseMode = "HTML") {
        try {
            const res = await fetch(`${this.baseUrl}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text,
                    parse_mode: parseMode,
                }),
            });
            const data = await res.json();
            if (!data.ok) console.error("[Telegram] Send error:", data.description);
            return data;
        } catch (err) {
            console.error("[Telegram] Send failed:", err.message);
        }
    }

    // Poll for new messages
    async poll() {
        try {
            const res = await fetch(
                `${this.baseUrl}/getUpdates?offset=${this.lastUpdateId + 1}&timeout=30`
            );
            const data = await res.json();

            if (!data.ok || !data.result?.length) return;

            for (const update of data.result) {
                this.lastUpdateId = update.update_id;
                const text = update.message?.text;
                if (!text) continue;

                const command = text.split(" ")[0].toLowerCase();
                const handler = this.commandHandlers.get(command);

                if (handler) {
                    try {
                        await handler(update.message);
                    } catch (err) {
                        console.error(`[Telegram] Handler error for ${command}:`, err.message);
                        await this.send(`⚠️ Error: ${err.message}`);
                    }
                }
            }
        } catch (err) {
            // Network errors are expected during long polling, just retry
            if (!err.message.includes("abort")) {
                console.error("[Telegram] Poll error:", err.message);
            }
        }
    }

    // Start the polling loop
    async startPolling() {
        console.log("🤖 Telegram bot polling started...");
        while (true) {
            await this.poll();
            // Small delay to prevent hammering on errors
            await new Promise((r) => setTimeout(r, 1000));
        }
    }
}
