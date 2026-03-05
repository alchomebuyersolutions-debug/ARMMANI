import { createClient } from "@supabase/supabase-js";
import { ApifyClient } from "apify-client";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const MetaApi = require('metaapi.cloud-sdk');
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../../.env");
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
}
else {
    dotenv.config();
}
export const APIFY_TOKEN = process.env.APIFY_API_TOKEN;
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const METAAPI_TOKEN = process.env.METAAPI_TOKEN;
export const METAAPI_ACCOUNT_ID = process.env.METAAPI_ACCOUNT_ID;
export const BLOFIN_API_KEY = process.env.BLOFIN_API_KEY;
export const BLOFIN_SECRET_KEY = process.env.BLOFIN_SECRET_KEY;
export const BLOFIN_PASSPHRASE = process.env.BLOFIN_PASSPHRASE;
export const apifyClient = new ApifyClient({ token: APIFY_TOKEN });
export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
export const metaApi = METAAPI_TOKEN ? new MetaApi.default(METAAPI_TOKEN) : null;
export const copyFactory = METAAPI_TOKEN ? new MetaApi.CopyFactory(METAAPI_TOKEN) : null;
// Risk Constants
export const ACCOUNT_SIZE = Number(process.env.ACCOUNT_SIZE) || 50000;
export const MAX_TOTAL_DRAWDOWN = Number(process.env.MAX_TOTAL_DRAWDOWN) || 4000;
export const MAX_DAILY_LOSS = Number(process.env.MAX_DAILY_LOSS) || 1000;
export const REVENGE_TRADING_DELAY_MINS = Number(process.env.REVENGE_TRADING_DELAY_MINS) || 60;
export const RISK_PER_TRADE_PERCENT = Number(process.env.RISK_PER_TRADE_PERCENT) || 0.005;
//# sourceMappingURL=clients.js.map