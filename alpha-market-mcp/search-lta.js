import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
async function searchLTA() {
    console.log("Searching for LTA information...");
    const { data, error } = await supabase
        .from("alpha_memory")
        .select("*")
        .or('topic.ilike.%LTA%,data.ilike.%LTA%');
    if (error) {
        console.error("Error:", error.message);
        return;
    }
    if (data && data.length > 0) {
        console.log("Found LTA related data:");
        console.log(JSON.stringify(data, null, 2));
    }
    else {
        console.log("No LTA related data found in Alpha's memory yet.");
    }
}
searchLTA();
//# sourceMappingURL=search-lta.js.map