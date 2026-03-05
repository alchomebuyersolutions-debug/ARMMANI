import { metaApi, METAAPI_ACCOUNT_ID, supabase, BLOFIN_API_KEY, BLOFIN_SECRET_KEY, BLOFIN_PASSPHRASE, ACCOUNT_SIZE, MAX_TOTAL_DRAWDOWN, REVENGE_TRADING_DELAY_MINS, RISK_PER_TRADE_PERCENT } from "../lib/clients.js";
import { isDrawdownBreached, checkRevengeTrading, calculateLotSize } from "../lib/risk.js";
import crypto from "crypto";
export async function executeMT5Trade(symbol, action, volume, sl, tp) {
    if (!metaApi || !METAAPI_ACCOUNT_ID) {
        return { isError: true, content: [{ type: "text", text: "MetaApi credentials missing." }] };
    }
    try {
        const account = await metaApi.metatraderAccountApi.getAccount(METAAPI_ACCOUNT_ID);
        const connection = account.getStreamingConnection();
        await connection.connect();
        await connection.waitSynchronized();
        const terminalState = connection.terminalState;
        if (!terminalState || !terminalState.accountInformation) {
            return { isError: true, content: [{ type: "text", text: "RISK CHECK FAILED: Account info unavailable." }] };
        }
        const currentEquity = terminalState.accountInformation.equity;
        // 1. Drawdown Check
        if (isDrawdownBreached(currentEquity, ACCOUNT_SIZE, MAX_TOTAL_DRAWDOWN)) {
            return { isError: true, content: [{ type: "text", text: "RISK BREACH: Total drawdown exceeded." }] };
        }
        // 2. Revenge Trading Check
        const { data: lastTrades } = await supabase
            .from("alpha_memory")
            .select("created_at")
            .eq("topic", "TRADE_EXECUTION")
            .order("created_at", { ascending: false })
            .limit(1);
        const latestTrade = lastTrades?.[0];
        if (latestTrade?.created_at) {
            const revenge = checkRevengeTrading(latestTrade.created_at, REVENGE_TRADING_DELAY_MINS);
            if (revenge.blocked) {
                return { isError: true, content: [{ type: "text", text: `RISK BREACH: Cooling off active (${revenge.remainingMins}m).` }] };
            }
        }
        let finalVolume = volume;
        if (finalVolume <= 0 && sl > 0) {
            const priceInfo = terminalState.price(symbol);
            if (priceInfo) {
                const currentPrice = action === "buy" ? priceInfo.ask : priceInfo.bid;
                finalVolume = calculateLotSize(symbol, currentPrice, sl, RISK_PER_TRADE_PERCENT, ACCOUNT_SIZE);
            }
        }
        if (finalVolume <= 0) {
            return { isError: true, content: [{ type: "text", text: "RISK CHECK FAILED: Lot size indeterminate." }] };
        }
        const result = action === "buy"
            ? await connection.createMarketBuyOrder(symbol, finalVolume, sl, tp)
            : await connection.createMarketSellOrder(symbol, finalVolume, sl, tp);
        await supabase.from("alpha_memory").insert([{
                topic: "TRADE_EXECUTION",
                data: JSON.stringify({ symbol, action, volume: finalVolume, orderId: result.orderId, equity: currentEquity }),
                created_at: new Date().toISOString()
            }]);
        return { content: [{ type: "text", text: `MT5 Trade Success: ID ${result.orderId}` }] };
    }
    catch (error) {
        return { isError: true, content: [{ type: "text", text: "Execution Error: " + error.message }] };
    }
}
export async function executeBlofinTrade(instId, side, orderType, size, price, marginMode = "cross", positionSide = "net") {
    if (!BLOFIN_API_KEY || !BLOFIN_SECRET_KEY || !BLOFIN_PASSPHRASE) {
        return { isError: true, content: [{ type: "text", text: "Blofin credentials missing." }] };
    }
    try {
        const endpoint = "/api/v1/trade/order";
        const method = "POST";
        const timestamp = Date.now().toString();
        const bodyObj = { instId, side, orderType, size, marginMode, positionSide };
        if (price)
            bodyObj.price = price;
        const bodyStr = JSON.stringify(bodyObj);
        const prehash = timestamp + method + endpoint + bodyStr;
        const signature = crypto.createHmac('sha256', BLOFIN_SECRET_KEY).update(prehash).digest('base64');
        const response = await fetch(`https://openapi.blofin.com${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                "ACCESS-KEY": BLOFIN_API_KEY,
                "ACCESS-SIGN": signature,
                "ACCESS-TIMESTAMP": timestamp,
                "ACCESS-PASSPHRASE": BLOFIN_PASSPHRASE,
            },
            body: bodyStr,
        });
        const result = await response.json();
        if (result.code !== "0" && result.code !== 0)
            throw new Error(`Blofin Error: ${result.msg}`);
        return { content: [{ type: "text", text: `Blofin trade success: ${JSON.stringify(result.data || result, null, 2)}` }] };
    }
    catch (error) {
        return { isError: true, content: [{ type: "text", text: "Blofin Execution Error: " + error.message }] };
    }
}
//# sourceMappingURL=trade.js.map