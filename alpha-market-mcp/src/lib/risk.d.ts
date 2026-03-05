export interface RiskConfig {
    accountSize: number;
    maxDailyLoss: number;
    maxTotalDrawdown: number;
    revengeTradingDelayMins: number;
}
export declare function calculateLotSize(symbol: string, currentPrice: number, sl: number, riskPercent: number, accountSize: number): number;
export declare function isDrawdownBreached(currentEquity: number, accountSize: number, maxTotalDrawdown: number): boolean;
export declare function checkRevengeTrading(lastTradeTime: string, delayMins: number): {
    blocked: boolean;
    remainingMins: number;
};
export declare function parseSignal(text: string): {
    symbol: string;
    action: string;
    sl: number;
    tp: number;
    raw: string;
};
//# sourceMappingURL=risk.d.ts.map