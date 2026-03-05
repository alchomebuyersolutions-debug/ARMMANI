import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing environment variables.");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkMemory() {
    console.log("Checking Alpha Market Memory Bank...");

    const { data, error } = await supabase
        .from("alpha_memory")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

    if (error) {
        console.error("❌ Error fetching data:", error.message);
        return;
    }

    if (data && data.length > 0) {
        console.log("✅ SUCCESS! Found data in memory bank:");
        console.log("Topic:", data[0].topic);
        console.log("Saved At:", data[0].created_at);

        // Parse the data snippet to show a preview
        const memoryData = JSON.parse(data[0].data);
        console.log("Full data structure of the first stored item:");
        console.log(JSON.stringify(memoryData[0], null, 2));
    } else {
        console.log("⚠️ Database table exists, but it is currently empty.");
    }
}

checkMemory();
