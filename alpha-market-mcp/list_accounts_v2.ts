import { createRequire } from "module";
const require = createRequire(import.meta.url);
const MetaApi = require('metaapi.cloud-sdk').default;
import dotenv from "dotenv";

dotenv.config();

async function main() {
    const api = new MetaApi(process.env.METAAPI_TOKEN);
    console.log("Checking for accounts...");
    try {
        const accounts = await api.metatraderAccountApi.getAccounts();
        for (const account of accounts) {
            console.log(`- ${account.name} (ID: ${account.id}, Server: ${account.server})`);
        }
    } catch (e: any) {
        console.error("Error:", e.message);
    }
}

main();
