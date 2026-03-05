const MetaApi = require('metaapi.cloud-sdk').default;
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(process.cwd(), '.env'), 'utf8');
const tokenLine = envFile.split('\n').find(l => l.startsWith('METAAPI_TOKEN='));
const token = tokenLine ? tokenLine.split('=')[1].replace(/['"]/g, '').trim() : null;

if (!token) {
    console.error("METAAPI_TOKEN not found in .env");
    process.exit(1);
}

const instanceId = '4f4ae9ab-dec0-4564-b7be-157ca52a4fc4';
const metaApi = new MetaApi(token);

async function run() {
    try {
        console.log(`Checking instance ID: ${instanceId}`);
        const account = await metaApi.metatraderAccountApi.getAccount(instanceId);
        console.log(`\n✅ Successfully found account!`);
        console.log(`Name: ${account.name}`);
        console.log(`Login: ${account.login}`);
        console.log(`Server: ${account.server}`);
        console.log(`State: ${account.state}`);
        console.log(`Type: ${account.type}`);
        console.log(`Connection Status: ${account.connectionStatus}`);
        process.exit(0);
    } catch (err) {
        console.error("\n❌ Error fetching account:", err.message);
        if (err.details) console.error(err.details);
        process.exit(1);
    }
}
run();
