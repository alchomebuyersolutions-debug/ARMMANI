import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
async function listTopics() {
    const { data: topics, error } = await supabase
        .from("alpha_memory")
        .select("topic")
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Error:", error.message);
        return;
    }
    const uniqueTopics = [...new Set(topics.map(t => t.topic))];
    console.log("Unique topics in Alpha's memory:");
    console.log(uniqueTopics);
}
listTopics();
//# sourceMappingURL=list-topics.js.map