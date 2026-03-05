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
        console.log(`Querying MetaApi Provisioning API for all servers...`);

        const response = await axios.get('https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai/users/current/provisioning-profiles', {
            headers: {
                'auth-token': token,
                'Accept': 'application/json'
            }
        });

        fs.writeFileSync('all_servers.json', JSON.stringify(response.data, null, 2));
        console.log(`Saved server list to all_servers.json. Data type: ${Array.isArray(response.data) ? 'Array' : typeof response.data}`);

    } catch (err) {
        console.error("\nError:", err.message);
        if (err.response && err.response.data) {
            console.error(err.response.data);
        }
        process.exit(1);
    }
}
fetchServers();
