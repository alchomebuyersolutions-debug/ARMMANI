import { createRequire } from "module";
const require = createRequire(import.meta.url);
const MetaApi = require('metaapi.cloud-sdk');
import dotenv from "dotenv";
dotenv.config();
const METAAPI_TOKEN = process.env.METAAPI_TOKEN;
async function main() {
    if (!METAAPI_TOKEN) {
        console.error("METAAPI_TOKEN not found in .env");
        return;
    }
    const api = new MetaApi.default(METAAPI_TOKEN);
    console.log("Fetching provisioning profiles...");
    try {
        const profiles = await api.provisioningProfileApi.getProvisioningProfiles();
        console.log("Profiles:", JSON.stringify(profiles, null, 2));
    }
    catch (e) {
        console.error("Error fetching profiles:", e.message);
    }
    console.log("\nFetching servers...");
    try {
        // Search for Apex servers specifically
        const servers = await api.metatraderAccountApi.searchServers('Apex');
        console.log("Apex Servers:", JSON.stringify(servers, null, 2));
    }
    catch (e) {
        console.error("Error fetching servers:", e.message);
    }
}
main().catch(console.error);
//# sourceMappingURL=inspect_meta_meta.js.map