export declare function executeMT5Trade(symbol: string, action: string, volume: number, sl: number, tp: number): Promise<{
    isError: boolean;
    content: {
        type: string;
        text: string;
    }[];
} | {
    content: {
        type: string;
        text: string;
    }[];
    isError?: never;
}>;
export declare function executeBlofinTrade(instId: string, side: string, orderType: string, size: string, price?: string, marginMode?: string, positionSide?: string): Promise<{
    isError: boolean;
    content: {
        type: string;
        text: string;
    }[];
} | {
    content: {
        type: string;
        text: string;
    }[];
    isError?: never;
}>;
//# sourceMappingURL=trade.d.ts.map