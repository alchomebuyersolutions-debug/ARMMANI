import { supabase } from "../lib/clients.js";
export async function saveTradeMemory(topic, data) {
    try {
        const { error } = await supabase
            .from("alpha_memory")
            .insert([{ topic, data, created_at: new Date().toISOString() }]);
        if (error)
            throw error;
        return { content: [{ type: "text", text: `Successfully saved memory about: ${topic}` }] };
    }
    catch (error) {
        return { isError: true, content: [{ type: "text", text: "Error saving memory: " + error.message }] };
    }
}
export async function getTradeMemory(topic) {
    try {
        const { data, error } = await supabase
            .from("alpha_memory")
            .select("*")
            .eq("topic", topic)
            .order("created_at", { ascending: false });
        if (error)
            throw error;
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
    catch (error) {
        return { isError: true, content: [{ type: "text", text: "Error fetching memory: " + error.message }] };
    }
}
//# sourceMappingURL=memory.js.map