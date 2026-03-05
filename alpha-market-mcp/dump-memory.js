import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
async function dumpMemory() {
    const { data, error } = await supabase
        .from("alpha_memory")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Error:", error.message);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
}
dumpMemory();
//# sourceMappingURL=dump-memory.js.map