export declare function saveStrategy(filename: string, content: string): Promise<{
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
//# sourceMappingURL=strategy.d.ts.map