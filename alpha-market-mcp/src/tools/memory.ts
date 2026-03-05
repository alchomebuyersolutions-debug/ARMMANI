import { supabase } from "../lib/clients.js";

export async function saveTradeMemory(topic: string, data: string) {
    try {
        const { error } = await supabase
            .from("alpha_memory")
            .insert([{ topic, data, created_at: new Date().toISOString() }]);

        if (error) throw error;
        return { content: [{ type: "text", text: `Successfully saved memory about: ${topic}` }] };
    } catch (error: any) {
        return { isError: true, content: [{ type: "text", text: "Error saving memory: " + error.message }] };
    }
}

export async function getTradeMemory(topic: string) {
    try {
        const { data, error } = await supabase
            .from("alpha_memory")
            .select("*")
            .eq("topic", topic)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (error: any) {
        return { isError: true, content: [{ type: "text", text: "Error fetching memory: " + error.message }] };
    }
}
