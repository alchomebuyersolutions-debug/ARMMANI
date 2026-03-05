export declare function saveTradeMemory(topic: string, data: string): Promise<{
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
export declare function getTradeMemory(topic: string): Promise<{
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
//# sourceMappingURL=memory.d.ts.map