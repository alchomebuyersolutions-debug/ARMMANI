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

const metaApi = new MetaApi(token);

// User provided credentials
const login = "8992585";
const serversToTry = [
    "AAAFxGlobal-FX-Live",
    "AAAFx-FX-Real",
    "AAAFx-FX-Live",
    "AAAFx-Real",
    "AAAFx-Live",
    "AAAFxGlobal-Real"
];
const password = "Jovanni27$";

async function linkAccount() {
    for (const server of serversToTry) {
        console.log(`\n================================`);
        console.log(`Trying server: ${server}...`);
        try {
            const account = await metaApi.metatraderAccountApi.createAccount({
                name: `test_${login}`,
                login: login,
                password: password,
                server: server,
                platform: 'mt5',
                magic: 1000,
                quoteStreamingIntervalInSeconds: 2.5
            });

            console.log(`\n✅ Successfully added account using server: ${server}!`);
            console.log(`Account ID (Instance ID): ${account.id}`);
            console.log(`State: ${account.state}`);

            console.log("\nInitiating deployment...");
            await account.deploy();
            console.log("Deployment initiated. State:", account.state);

            console.log("\nWaiting for account to be connected (max 60s)...");
            await account.waitConnected();
            console.log("Account connected successfully!");
            process.exit(0);

        } catch (createErr) {
            if (createErr.message && createErr.message.includes(".dat file for server")) {
                console.log(`❌ Server ${server} not found in MetaApi database.`);
            } else {
                console.log(`❌ Failed with server ${server}:`, createErr.message);
                if (createErr.details) console.log(createErr.details);
            }
        }
    }
    console.log("\n❌ Exhausted all server options. None matched.");
    process.exit(1);
}
linkAccount();
