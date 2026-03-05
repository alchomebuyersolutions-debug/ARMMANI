const axios = require('axios');
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(process.cwd(), '.env'), 'utf8');
const tokenLine = envFile.split('\n').find(l => l.startsWith('METAAPI_TOKEN='));
const token = tokenLine ? tokenLine.split('=')[1].replace(/['"]/g, '').trim() : null;

if (!token) {
    console.error("METAAPI_TOKEN not found in .env");
    process.exit(1);
}

async function fetchServers() {
    try {
        const query = "AAA".toLowerCase();
        console.log(`Querying MetaApi Provisioning API for servers containing: ${query}...`);

        // This endpoint requires a 'region' header, but we'll try to trigger an error specifically with the server query 
        // to grab the server list from the error details, just in case doing it this way is cleaner over REST.
        const response = await axios.post('https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai/users/current/accounts', {
            name: "test_server_search",
            login: "12345",
            password: "password",
            server: query + "-Invalid", // Force an error to get suggestions
            platform: 'mt5',
            magic: 1000
        }, {
            headers: {
                'auth-token': token,
                'Accept': 'application/json'
            }
        });

    } catch (err) {
        if (err.response && err.response.data && err.response.data.serversByBrokers) {
            console.log("\nFound server suggestions by brokers:");
            const suggestions = err.response.data.serversByBrokers;

            // Output ALL suggestions first to see what we're working with
            console.log(JSON.stringify(suggestions, null, 2));

            let found = false;
            for (const [broker, servers] of Object.entries(suggestions)) {
                const matchingServers = servers.filter(s => s.toLowerCase().includes(query));
                if (matchingServers.length > 0) {
                    console.log(`\nBroker: ${broker}`);
                    matchingServers.forEach(m => console.log(`- ${m}`));
                    found = true;
                }
            }
            if (!found) console.log(`\n❌ No exact matches for "${query}".`);

        } else {
            console.error("\nError:", err.message);
            if (err.response && err.response.data) {
                console.error(err.response.data);
            }
        }
        process.exit(1);
    }
}
fetchServers();
