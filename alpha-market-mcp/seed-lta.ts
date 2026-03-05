import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '.env') });

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedLTAMemory() {
    console.log("Seeding Alpha's memory with LTA Strategy rules...");

    const strategyData = {
        name: "Alpha LTA Gold Strategy",
        session: "9:30-11:00 AM",
        orb_window: "10 min",
        risk_per_trade: 250,
        max_daily_loss: 500,
        lot_size: "0.20-0.25",
        instrument: "XAUUSD",
        rules: [
            "Trade only between 09:40 and 11:00 AM",
            "Use ORB Sniper V2 Mode",
            "Max 2 trades per day",
            "Target 1:2 RR minimum"
        ]
    };

    const { data, error } = await supabase
        .from("alpha_memory")
        .insert([
            {
                topic: "LTA_STRATEGY_RULES",
                data: JSON.stringify(strategyData),
                created_at: new Date().toISOString()
            }
        ]);

    if (error) {
        console.error("Error seeding memory:", error.message);
    } else {
        console.log("LTA Strategy successfully integrated into Alpha's long-term memory.");
    }
}

seedLTAMemory();
