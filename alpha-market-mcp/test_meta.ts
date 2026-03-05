import { createRequire } from "module";
const require = createRequire(import.meta.url);
const MetaApi = require('metaapi.cloud-sdk');
import dotenv from "dotenv";

dotenv.config();

const api = new MetaApi.default(process.env.METAAPI_TOKEN);
console.log("api.metatraderAccountApi:", typeof api.metatraderAccountApi);
console.log("Keys of api:", Object.keys(api));

if (api.metatraderAccountApi) {
    console.log("Keys of api.metatraderAccountApi:", Object.keys(api.metatraderAccountApi));
    if (typeof api.metatraderAccountApi.getAccounts === 'function') {
        console.log("getAccounts is a function!");
    } else {
        console.log("getAccounts is NOT a function.");
    }
}
