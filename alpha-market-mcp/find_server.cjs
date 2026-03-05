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

async function findServer() {
    try {
        const query = "AAAFxGlobal".toLowerCase();
        console.log(`Searching for server matching: ${query}`);

        // Fetch all supported provisioning profiles (servers)
        const profiles = await metaApi.provisioningProfileApi.getProvisioningProfiles();

        const matches = profiles.filter(p => p.name.toLowerCase().includes(query));

        if (matches.length > 0) {
            console.log(`\n✅ Found ${matches.length} matching servers:`);
            matches.forEach(m => {
                console.log(`- ${m.name}`);
            });
        } else {
            // Let's try parsing through all servers to find "AAA"
            const allMatches = profiles.filter(p => p.name.toLowerCase().includes("aaa"));
            console.log(`\n❌ No exact matches for "${query}". Finding servers with "AAA":`);
            allMatches.forEach(m => console.log(`- ${m.name}`));

            if (allMatches.length === 0) {
                console.log("\nNo servers with 'AAA' found. Here is a sample of 10 available servers:");
                profiles.slice(0, 10).forEach(m => console.log(`- ${m.name}`));
            }
        }
        process.exit(0);

    } catch (err) {
        console.error("\nError:", err.message);
        process.exit(1);
    }
}
findServer();
