import { createRequire } from "module";
const require = createRequire(import.meta.url);
const MetaApi = require('metaapi.cloud-sdk');

console.log("Namespace keys:", Object.keys(MetaApi));
if (MetaApi.default) {
    console.log("Default keys:", Object.keys(MetaApi.default));
}
