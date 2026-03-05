import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
async function exhaustiveDump() {
    console.log("Starting exhaustive memory dump...");
    let { data, error } = await supabase
        .from("alpha_memory")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Error:", error.message);
        return;
    }
    if (data) {
        console.log(`Found ${data.length} entries.`);
        data.forEach(entry => {
            console.log(`--- TOPIC: ${entry.topic} (${entry.created_at}) ---`);
            console.log(entry.data);
            console.log("--------------------------------------------------");
        });
    }
}
exhaustiveDump();
//# sourceMappingURL=exhaustive-dump.js.map