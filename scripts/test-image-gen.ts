import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    console.log("Found .env.local at:", envPath);
    const keysFound: string[] = [];
    envConfig.split(/\r?\n/).forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=');
            process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
            keysFound.push(key.trim());
        }
    });
    console.log("Keys found in .env.local:", keysFound);
} else {
    console.error(".env.local NOT found at:", envPath);
}

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("API_KEY or GEMINI_API_KEY not found in .env.local");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function listModels() {
    console.log("Listing available models...");
    try {
        const response = await ai.models.list();
        console.log("Models containing 'imagen':");
        // @ts-ignore - Pager might be async iterable or have a different structure
        for await (const model of response) {
            if (model.name.toLowerCase().includes('imagen')) {
                console.log(`- ${model.name} (${model.displayName})`);
            }
        }
    } catch (error: any) {
        console.error("Failed to list models:", error.message);
        console.error("Full Error:", JSON.stringify(error, null, 2));
    }
}

listModels();
