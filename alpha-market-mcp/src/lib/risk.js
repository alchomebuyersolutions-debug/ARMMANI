export function calculateLotSize(symbol, currentPrice, sl, riskPercent, accountSize) {
    const riskAmount = accountSize * riskPercent;
    const distance = Math.abs(currentPrice - sl);
    if (distance <= 0)
        return 0.01;
    let lots = 0;
    const upperSymbol = symbol.toUpperCase();
    if (upperSymbol.includes("XAU") || upperSymbol.includes("GOLD")) {
        // Gold: 1 Lot = $100 per $1 move
        lots = riskAmount / (distance * 100);
    }
    else if (upperSymbol.includes("US30") || upperSymbol.includes("NAS100")) {
        // Indices: 1 Lot = $1 per 1 point
        lots = riskAmount / distance;
    }
    else {
        // Forex: 1 Lot = $10 per pip (assuming standard 100k contract)
        lots = riskAmount / (distance * 10000 * 10);
    }
    return Math.max(0.01, Math.floor(lots * 100) / 100);
}
export function isDrawdownBreached(currentEquity, accountSize, maxTotalDrawdown) {
    const totalLoss = accountSize - currentEquity;
    return totalLoss >= maxTotalDrawdown;
}
export function checkRevengeTrading(lastTradeTime, delayMins) {
    const lastTime = new Date(lastTradeTime).getTime();
    const now = Date.now();
    const minsSinceLastTrade = (now - lastTime) / 60000;
    if (minsSinceLastTrade < delayMins) {
        return {
            blocked: true,
            remainingMins: Math.ceil(delayMins - minsSinceLastTrade)
        };
    }
    return { blocked: false, remainingMins: 0 };
}
export function parseSignal(text) {
    const lines = text.toUpperCase().split('\n');
    let symbol = "";
    let action = "";
    let sl = 0;
    let tp = 0;
    const pairs = ["XAUUSD", "GOLD", "EURUSD", "GBPUSD", "US30", "NAS100", "BTCUSD"];
    for (const line of lines) {
        for (const p of pairs) {
            if (line.includes(p))
                symbol = p === "GOLD" ? "XAUUSD" : p;
        }
        if (line.includes("BUY") || line.includes("LONG"))
            action = "buy";
        if (line.includes("SELL") || line.includes("SHORT"))
            action = "sell";
        if (line.includes("SL") || line.includes("STOP")) {
            const match = line.match(/\d+(\.\d+)?/);
            if (match)
                sl = parseFloat(match[0]);
        }
        if (line.includes("TP") || line.includes("TARGET") || line.includes("PROFIT")) {
            const match = line.match(/\d+(\.\d+)?/);
            if (match)
                tp = parseFloat(match[0]);
        }
    }
    return { symbol, action, sl, tp, raw: text };
}
//# sourceMappingURL=risk.js.map