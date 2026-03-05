import { createRequire } from "module";
const require = createRequire(import.meta.url);
const MetaApi = require('metaapi.cloud-sdk');
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "./.env");

if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else {
    dotenv.config();
}

const METAAPI_TOKEN = process.env.METAAPI_TOKEN;

async function main() {
    if (!METAAPI_TOKEN) {
        console.error("METAAPI_TOKEN not found in .env");
        return;
    }

    const api = new MetaApi.default(METAAPI_TOKEN);

    try {
        console.log("Fetching accounts...");
        const accounts = await api.metatraderAccountApi.getAccounts();
        console.log("Accounts found:", accounts.length);
        accounts.forEach((acc: any) => {
            console.log(`- ID: ${acc.id}, Name: ${acc.name}, Server: ${acc.server}, Platform: ${acc.platform}, Type: ${acc.type}`);
        });
    } catch (e: any) {
        console.error("Error fetching accounts:", e.message);
        // Try alternate access if it's not a function
        console.log("Available properties on api:", Object.keys(api));
        if (api.metatraderAccountApi) {
            console.log("Available properties on metatraderAccountApi:", Object.keys(api.metatraderAccountApi));
        }
    }
}

main().catch(console.error);
