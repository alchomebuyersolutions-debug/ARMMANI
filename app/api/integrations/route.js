import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to our mock data file
const dataFilePath = path.join(process.cwd(), 'data', 'integrations.json');

// Helper to read data
const readIntegrationsData = () => {
    try {
        if (!fs.existsSync(dataFilePath)) {
            // Create default data if doesn't exist
            const defaultData = {
                youtube: false,
                twitter: false,
                discord: false,
                telegram: false,
                reddit: false,
                instagram: false,
                twitch: false,
                meta: false,
                tiktok: false,
                customWebhook: false,
            };

            // Ensure directory exists
            const dir = path.dirname(dataFilePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
            return defaultData;
        }

        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error("Error reading integrations data:", error);
        return {};
    }
};

// GET current integration states
export async function GET() {
    const data = readIntegrationsData();
    return NextResponse.json(data);
}

// POST to update an integration state
export async function POST(request) {
    try {
        const body = await request.json();
        const { platform, connected } = body;

        if (!platform || typeof connected !== 'boolean') {
            return NextResponse.json(
                { error: "Invalid request. Must provide 'platform' and 'connected' boolean." },
                { status: 400 }
            );
        }

        const data = readIntegrationsData();

        // Update the specific platform
        data[platform] = connected;

        // Save back to file
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true, platform, connected });
    } catch (error) {
        console.error("Error updating integration data:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
