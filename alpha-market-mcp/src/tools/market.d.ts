export declare function runApifyScraper(url: string, extractRules?: string): Promise<{
    content: {
        type: string;
        text: string;
    }[];
    isError?: never;
} | {
    isError: boolean;
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function getMarketNews(query: string): Promise<{
    content: {
        type: string;
        text: string;
    }[];
    isError?: never;
} | {
    isError: boolean;
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=market.d.ts.map